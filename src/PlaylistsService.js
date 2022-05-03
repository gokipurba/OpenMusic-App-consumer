const { Pool } = require("pg/lib");
const { mapSongDBToModel, mapPlaylistDBToModel } = require("./utils");

class PlaylistsService {
    constructor(){
        this._pool  = new Pool();
    }

    async getPlaylists(playlistId){
        const query = {
            text: `SELECT playlists.id, playlists.name FROM playlists
                  WHERE playlists.id = $1`,
            values: [playlistId],
        };
        const result = await this._pool.query(query);
        return result.rows[0];
    }

    async getSong(playlistId) {
        const query = {
          text: `SELECT songs.id, songs.title, songs.performer
                FROM playlist_songs
                JOIN songs ON playlist_songs.song_id = songs.id
                WHERE playlist_songs.playlist_id = $1`,
          values: [playlistId],
        };
        const result = await this._pool.query(query);
        return result.rows;
    }   
}

module.exports = PlaylistsService;