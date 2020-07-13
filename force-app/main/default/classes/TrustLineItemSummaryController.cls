public class TrustLineItemSummaryController {    
    @AuraEnabled(cacheable=true)
    public static List<Trust_Line_Item__c> RetriveTrustLineItems(Id TrustId) {
        return [SELECT Id, Amount__c, Billable_Rate__c, 
                    Deposit__c, Hours_Billed__c, Name, Processing_Date_Time__c, Description__c
                FROM Trust_Line_Item__c
                WHERE Trust__c = :TrustId
                ORDER BY Processing_Date_Time__c DESC];
    }
}