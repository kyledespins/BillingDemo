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
    { label: 'Item Number', fieldName: 'nameURL', type: 'url',
            typeAttributes: {label: { fieldName: 'name' },  }
        },
    { label: 'Amount', fieldName: 'amount', type: 'currency', 
        cellAttributes: {class: { fieldName: 'cssClass' } }},
    { label: 'Description', fieldName: 'description', type: 'text' },
    { label: 'Processing Date/Time', fieldName: 'processingDateTime', type: 'date',
        typeAttributes:{
            month: "2-digit",
            day: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit"
        }}
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
                row.nameURL = `/${element.Id}`;
                row.name = element.Name;
                row.amount = element.Amount__c;
                if(element.Amount__c > 0){
                    row.cssClass = 'slds-text-color_success';
                }
                else{
                    row.cssClass = 'slds-text-color_error';
                }
                row.description = element.Description__c;
                row.processingDateTime = element.Processing_Date_Time__c;
                
                tempArray.push(row);
            });
            this.tableData = tempArray;
        }
    }

}