import { LightningElement, api, wire, track } from 'lwc';
import retriveTrustLineItems from '@salesforce/apex/TrustLineItemSummaryController.RetriveTrustLineItems';
import { refreshApex } from '@salesforce/apex';
import {
    CurrentPageReference
} from 'lightning/navigation';
import {
    registerListener,
    unregisterAllListeners,
    fireEvent
} from 'c/pubsub';

const columns = [
    { label: 'Item Number', fieldName: 'name', type: 'text' },
    { label: 'Amount', fieldName: 'amount', type: 'currency' },
    { label: 'Processing Date/Time', fieldName: 'processingDateTime', type: 'date' }
];

export default class TrustLineItemSummaryComponent extends LightningElement {
    @api recordId;
    @track tableData = [];
    @track columns = columns;
    @wire(CurrentPageReference) pageRef;
    clientDataToRefresh;
    
    connectedCallback() {
        // subscribe to billCreateSuccess event
        registerListener('billCreateSuccess', this.handleNotification, this);
    }

    disconnectedCallback() {
        // unsubscribe from billCreateSuccess event
        unregisterAllListeners(this);
    }
    handleNotification(){
        console.log("CAPTURE EVENT");
        refreshApex(this.clientDataToRefresh)
    };
    
    @wire(retriveTrustLineItems, {TrustId: '$recordId'})
    setTable(value) {
        this.clientDataToRefresh = value;
        const { data, error } = value; // destructure 
        if(data) {
            let tempArray = []
            data.forEach(element => {
                let row = {};
                row.name = element.Name;
                row.amount = element.Amount__c;
                row.processingDateTime = element.Processing_Date_Time__c;
                
                tempArray.push(row);
            });
            this.tableData = tempArray;
        }
        console.log('debug');
        console.log(this.tableData);
    }

}