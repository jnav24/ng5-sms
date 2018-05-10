import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as Twilio from 'twilio';

admin.initializeApp();

async function twilioCreds() {
    try {
        const twilio = await admin
            .firestore()
            .doc('controls/NehjULdopYgLs7k7sNvt')
            .get();

        return twilio.data();
    } catch (err) {
        const msg = 'Unable to retrieve twilio credentials';
        console.error(msg);
        throw msg;
    }
}

async function getUser(userNumber) {
    try {
        return await admin.firestore()
            .collection(`users`)
            .where('preferred', '==', userNumber)
            .get();
    } catch (err) {
        const errMsg = "Unable to retrieve user";
        console.error(errMsg);
        throw errMsg;
    }
}

async function getContact(contactNumber) {
    try {
        return await admin.firestore()
            .collection(`contacts`)
            .where('preferred', '==', contactNumber)
            .get();
    } catch (err) {
        const errMsg = "Unable to retrieve contact";
        console.error(errMsg);
        throw errMsg;
    }
}

export const retrieveSms = functions.https.onRequest((request, response) => {
    const twiml = new Twilio.twiml.MessagingResponse();
    let msg = 'Unable to send message. Must be a post.';
    let statusCode = 403;

    if (request.method === 'POST' && Object.keys(request.body).length) {
        console.log(request.body);
        const smsTo = request.body.To;
        const smsFrom = request.body.From;
        const smsMsg = request.body.Body;
        let errMsg = '';
        msg = 'Message received successfully';
        statusCode = 200;

        getUser(smsTo).then(userSnapshot => {
            const user_message_ids = [];
            const contact_message_ids = [];

            userSnapshot.forEach(user => {
                user.data()['message_ids'].map(id => {
                    user_message_ids.push(id);
                });
            });

            getContact(smsFrom).then(contactSnapshot => {
                if (contactSnapshot.size) {
                    contactSnapshot.forEach(contact => {
                        contact.data()['message_ids'].map(id => {
                            contact_message_ids.push(id);
                        });
                    });

                    const message_ids = user_message_ids.filter(id => {
                        return contact_message_ids.indexOf(id) > -1;
                    });

                    if (message_ids.length) {
                        const mid = message_ids.shift();

                        admin.firestore()
                            .doc(`messages/${mid}`)
                            .collection('conversation')
                            .add({
                                to: smsTo,
                                from: smsFrom,
                                message: smsMsg,
                                state: 'unread',
                                created: Math.round((new Date()).getTime() / 1000).toString()
                            })
                            .catch(err => {
                                errMsg = 'Unable to add conversation to message' + err;
                                console.error(errMsg);
                            });
                    }
                } else {
                    // create new message/conversation
                    // create new contact and add message id
                    // add message id to user
                }
            })
            .catch(err => {
                console.error(err);
            });
        })
        .catch(err => {
            console.error(err);
        });
    }

    twiml.message(msg);
    response.writeHead(statusCode, {'Content-Type': 'text/xml'});
    response.end();
});

exports.sendSms = functions.firestore.document('messages/{message_id}/conversation/{conversation_id}')
    .onCreate((snap, context) => {
        twilioCreds()
            .then(res => {
                const twilio = new Twilio(res['twilio_account_sid'], res['twilio_auth_token']);
                const msg = snap.data();

                return admin.firestore()
                    .doc(`contacts/${msg.to}`).get()
                    .then(contact => {
                        if (contact.exists) {
                            const sms = {
                                from: res['twilio_number'],
                                to: contact.data()['phone'][0]['number'],
                                body: msg['message']
                            };

                            return twilio.messages.create(sms);
                        }

                        return null;
                    })
                    .catch(err => {
                        console.log('unable to get contact: ' + err);
                        return err;
                    });
            })
            .then(message => console.log(message.sid, 'success'))
            .catch(err => console.error('unable to send sms'));
    });
