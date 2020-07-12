import { LightningElement, api, wire, track } from 'lwc';
import retriveTrustLineItems from '@salesforce/apex/TrustLineItemSummaryController.RetriveTrustLineItems';


const columns = [
    { label: 'Item Number', fieldName: 'name', type: 'text' },
    { label: 'Amount', fieldName: 'amount', type: 'currency' }
];

export default class TrustLineItemSummaryComponent extends LightningElement {
    @api recordId;
    @track tableData = [];
    @track columns = columns;
    
    @wire(retriveTrustLineItems, {TrustId: '$recordId'})
    setTable({error, data}) {
        console.log(data);
        if(data) {
            let tempArray = []
            data.forEach(element => {
                let row = {};
                row.name = element.Name;
                row.amount = element.Amount__c;

                tempArray.push(row);
            });
            this.tableData = tempArray;
        }
        console.log('debug');
        console.log(this.tableData);
    }
}