const { Client } = require('node-rest-client');
const config = require('../config/config');

function ZoomService() {
    this.clienteId = config.zoomConfig.clientId;
    this.clientSecret = config.zoomConfig.clientSecret;
    this.accountId = config.zoomConfig.accountId;
    this.baseUrl = config.zoomConfig.baseUrl;
    this.restClient = new Client();

}
// Private function: not exported and accessible only within this module
function generateBase64Credentials(clientId, clientSecret) {
    const credentials = `${clientId}:${clientSecret}`;
    return Buffer.from(credentials).toString('base64');
}

function createMeetingObject(nomeAgenda, emailResponsavel, nomeResponsavel, emailConvidado, dataHoraInicio, duracao)
{
    return {
        "agenda": nomeAgenda,
        "default_password": false,
        "duration": duracao,
        "pre_schedule": false,
        "schedule_for": emailResponsavel,
        "settings": {
            "allow_multiple_devices": true,
            "approval_type": 2,
            "audio": "telephony",
            "auto_recording": "cloud",
            "close_registration": false,
            "contact_email": emailResponsavel,
            "contact_name": nomeResponsavel,
            "encryption_type": "enhanced_encryption",
            "focus_mode": true,
            "host_video": true,
            "jbh_time": 0,
            "join_before_host": false,
            "meeting_authentication": true,
            "meeting_invitees": [
                {
                    "email": emailConvidado
                }
            ],
            "participant_video": true,
            "private_meeting": false,
            "registrants_confirmation_email": false,
            "registrants_email_notification": false,
            "registration_type": 1,
            "show_share_button": false,
            "use_pmi": false,
            "waiting_room": true,
            "watermark": false,
            "host_save_video_order": true,
            "alternative_host_update_polls": true
        },
        "start_time": dataHoraInicio,
        "timezone": "America/Sao_Paulo",
        "topic": nomeAgenda,
        "type": 2
    }
}

function generateToken() {
    return new Promise((resolve, reject) => {
        const args = {
            headers: {
                'Authorization': 'Basic ' + generateBase64Credentials(this.clienteId, this.clientSecret),
            }
        };

        this.restClient.post(
            `https://zoom.us/oauth/token?grant_type=account_credentials&account_id=${this.accountId}`,
            args,
            (data, response) => {
                if (response.statusCode >= 200 && response.statusCode < 300) {
                    resolve(data.access_token);
                } else {
                    reject(new Error(`Error generating token: ${response.statusMessage}`));
                }
            }
        ).on('error', (error) => {
            console.error('Error in generateToken request:', error);
            reject(error);
        });
    });
};

ZoomService.prototype.createMeeting = function(userId, meetingDetails) {
    return new Promise(async (resolve, reject) => {
        try {
            const token = await generateToken();
            const args = {
                data: createMeetingObject(meetingDetails.nomeAgenda, meetingDetails.emailResponsavel, meetingDetails.nomeResponsavel, meetingDetails.emailConvidado, meetingDetails.dataHoraInicio, meetingDetails.duracao),
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            };

            this.restClient.post(`${this.baseUrl}/users/${userId}/meetings`, args, (data, response) => {
                if (response.statusCode >= 200 && response.statusCode < 300) {
                    resolve(data);
                } else {
                    reject(new Error(`Ocorreu um erro ao criar a agenda: ${response.statusMessage}`));
                }
            }).on('error', (error) => {
                console.error('Ocorreu um erro ao criar a agenda request:', error);
                reject(error);
            });
        } catch (error) {
            console.error('Ocorreu um erro ao criar a agenda:', error);
            reject(error);
        }
    });
};

ZoomService.prototype.deleteMeeting = function(meetingId) {
    return new Promise(async (resolve, reject) => {
        try {
            const token = await generateToken();
            const args = {
                data: createMeetingObject(meetingDetails.nomeAgenda, meetingDetails.emailResponsavel, meetingDetails.nomeResponsavel, meetingDetails.emailConvidado, meetingDetails.dataHoraInicio, meetingDetails.duracao),
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            };

            this.restClient.delete(`${this.baseUrl}/meetings/${meetingId}&schedule_for_reminder=true&cancel_meeting_reminder=true`, args, (data, response) => {
                if (response.statusCode >= 200 && response.statusCode < 300) {
                    resolve(data);
                } else {
                    reject(new Error(`Error creating meeting: ${response.statusMessage}`));
                }
            }).on('error', (error) => {
                console.error('Error in createMeeting request:', error);
                reject(error);
            });

        } catch (error) {
            console.error('Error generating token:', error);
            reject(error);
        }
    });
};


module.exports = function () {
    return ZoomService;
}

