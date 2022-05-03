class Listener {
    constructor(playlistService, mailSender){
        this._playlistService = playlistService;
        this._mailSender = mailSender;

        this.listen = this.listen.bind(this);
    }

    async listen(message){
        try {
            const { playlistId, targetEmail } = JSON.parse(message.content.toString());
            console.log(playlistId);
            const playlists = await this._playlistService.getPlaylists(playlistId);
            console.log(playlists);
            const songs = await this._playlistService.getSong(playlistId);
            console.log(songs);

            const data = {
                palylists: {
                    ...playlists,
                    songs,
                },
            };
            console.log(data);
            const result = await this._mailSender.sendEmail(targetEmail, JSON.stringify(data));
            console.log(result)
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = Listener;