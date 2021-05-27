var AWS = require("aws-sdk");
let awsConfig = {
    "region": "us-east-2",
    "endpoint": "http://dynamodb.us-east-2.amazonaws.com",
    "accessKeyId": "AKIAZGJVKBIKLE6HJKFF", "secretAccessKey": "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"
};
AWS.config.update(awsConfig);

let docClient = new AWS.DynamoDB.DocumentClient();

let fetchAll = function () {
 
    const scanTable = async (TableNameAll = "Testing") => {    
        const paramsAll = {
            TableName: TableNameAll,
        };

        const scanResults = [];
        let items;
        do{
            items =  await docClient.scan(paramsAll).promise();
            items.Items.forEach((item) => scanResults.push(item));
            paramsAll.ExclusiveStartKey  = items.LastEvaluatedKey;
        }while(typeof items.LastEvaluatedKey !== "undefined");
        
        console.log(scanResults);
    };
    scanTable();
}

fetchAll();