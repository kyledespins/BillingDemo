import { LightningElement, api, wire, track } from 'lwc';
import { CurrentPageReference} from 'lightning/navigation';
import { fireEvent } from 'c/pubsub';
import sendBillingEmail from '@salesforce/apex/BillingController.SendBillingEmail';

export default class BillTrustComponent extends LightningElement {
    @api recordId;
    isDeposit;
    titleType = 'Create Bill';

    @wire(CurrentPageReference) pageRef;
    handleSuccess(event) {
        const inputFields = this.template.querySelectorAll(
            'lightning-input-field'
        );
        if (inputFields) {
            inputFields.forEach(field => {
                field.reset();
            });
        }
        //Reset UI to Bill UI
        this.isDeposit = false;
        this.titleType = 'Create Bill';
        fireEvent(this.pageRef, 'billCreateSuccess', event.target.value);
        sendBillingEmail({TrustId: this.recordId})
            .then(result => {
                console.log("Email Success");
            })
            .catch(error => {
                console.log(error); //TODO: Display the fact we did not send the email to the user
            });
    }

    handleSubmit(event) {
        event.preventDefault();  
        const fields = event.detail.fields;
        fields.Trust__c = this.recordId;
        this.template.querySelector('lightning-record-edit-form').submit(fields);
    }

    typeChange(event){
        if(event.target.value == "Deposit"){
            this.isDeposit = true;
            this.titleType = 'Create Deposit';
        }
        else{
            this.isDeposit = false;
            this.titleType = 'Create Bill';
        }
    }
}