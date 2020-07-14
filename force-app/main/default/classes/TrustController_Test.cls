@IsTest
public class TrustController_Test {

    @TestSetup
    static void makeData(){
        Account testAccount = new Account();
        testAccount.Account_Email__c = 'fake@email.com';
        testAccount.Name = 'TestName';
        insert testAccount;

        Trust__c t = new Trust__c();
        t.File_Number__c = 123;
        t.Trusts_Account__c = testAccount.Id;
        insert t;

        Trust_Line_Item__c tli_dep = new Trust_Line_Item__c();
        tli_dep.Deposit__c = 10000;
        tli_dep.Type__c = 'Deposit';
        tli_dep.Trust__c = t.Id;
        insert tli_dep;

        Trust_Line_Item__c tli_bill = new Trust_Line_Item__c();
        tli_bill.Billable_Rate__c = 15;
        tli_bill.Hours_Billed__c = 4;
        tli_bill.Type__c = 'Bill';
        tli_bill.Trust__c = t.Id;
        insert tli_bill;
    }

    static testMethod void billingSendEmail() {
        Trust__c trust = [SELECT Id FROM Trust__c][0];
        BillingController.SendBillingEmail(trust.id);
    }

    static testMethod void getTrustItems() {
        Trust__c trust = [SELECT Id FROM Trust__c][0];
        List<Trust_Line_Item__c> result = TrustLineItemSummaryController.RetriveTrustLineItems(trust.id);

        system.assert(result.size() == 2);
    }
}
