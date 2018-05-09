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

export const retrieveSms = functions.https.onRequest((request, response) => {
    const twiml = Twilio.twiml.MessagingResponse;
    const mresponse = new twiml();
    mresponse.message('The Robots are coming! Head for the hills!');
    console.log(request.method);
    console.log(request.query);
    console.log(twiml);
    console.log(mresponse);
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
