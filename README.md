# Use Cases

## A way for attorney to add a trust account 

This is done by adding a new Trust from the Account related list. Due to the fact that this is done less often for a specific account the default New Record page is used. 

## A way for attorneys to generate a bill

In order to support a one-page overview of the escrow account there is a modal on the Trust Record page to support bill generation. This modal will also generate a email notification to the cooresponding account.

## Attorneys need an at-a-glance view of activity on a trust

A table on the Trust will display all actions on the Trust that have occured. On creation of a bill this table auto updates to provide better visual aid that the bill has been created. 

## We cannot have a negative balence on a trust

A summary field on a trust is used in conjunction with a validation run on the trust line item to make sure that we never end up with a negative trust balence

# Assumptions

- There can be multiple deposits into a Trust Account and that is done by the attorney

- A Trust's funds cannot be lower than zero 

- An Account can have more than one Trust 

# Future enhancements and TODOs

## Error Handling for email failure

On creation of a bill we send an email to the account. If that fails we will want to notify the user for follow up. 

## Actual Bill Generation and email templating 

Current proof of concept uses a very brief email with minimal information. Future state could use document generation and a more robust email template. 