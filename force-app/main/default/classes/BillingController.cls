public with sharing class BillingController {   
    @AuraEnabled
    public static void SendBillingEmail(Id TrustId) {
        system.debug(TrustId);
        Trust__c trust = GetTrustRecord(TrustId);
        system.debug(trust);

        String userName = UserInfo.getUserName();
        User activeUser = [Select Email From User where Username = : userName limit 1];
        String userEmail = activeUser.Email;
        String accountEmail = trust.Trusts_Account__r.Account_Email__c;

        Messaging.SingleEmailMessage message = new Messaging.SingleEmailMessage();
        message.toAddresses = new List<string> { accountEmail };
        message.setReplyTo(userEmail);
        message.optOutPolicy = 'FILTER';
        message.subject = 'You have been billed';
        message.plainTextBody = FormatEmailBodyFromTrustRecord(trust);
        Messaging.SingleEmailMessage[] messages =   new List<Messaging.SingleEmailMessage> {message};
        Messaging.SendEmailResult[] results = Messaging.sendEmail(messages);
    }

    private static string FormatEmailBodyFromTrustRecord(Trust__c Trust){
        return 'You have ' + Trust.Total_Amount_In_Escrow__c + ' left in your escrow account: ' + Trust.File_Number__c;
    }
    
    private static Trust__c GetTrustRecord(Id TrustId){    
        Trust__c trust =  [SELECT Total_Amount_In_Escrow__c, Trusts_Account__r.Account_Email__c, File_Number__c
                FROM Trust__c
                WHERE Id = :TrustId];
        
        return trust;
    }
}
