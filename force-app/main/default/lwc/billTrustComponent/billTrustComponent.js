import { LightningElement, api, wire, track } from 'lwc';
import { CurrentPageReference} from 'lightning/navigation';
import { fireEvent } from 'c/pubsub';

export default class BillTrustComponent extends LightningElement {
    @api recordId;
    
    @wire(CurrentPageReference) pageRef;
    handleSuccess(event) {
        console.log('onsuccess event recordEditForm',event.detail.id);
        fireEvent(this.pageRef, 'billCreateSuccess', event.target.value);
    }

    handleSubmit(event) {
        event.preventDefault();  
        const fields = event.detail.fields;
        fields.Trust__c = this.recordId;
        this.template.querySelector('lightning-record-edit-form').submit(fields);
    }
}