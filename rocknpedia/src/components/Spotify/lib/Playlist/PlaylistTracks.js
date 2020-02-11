import React from 'react';
import PropTypes from 'prop-types';
import ApiRequest from '../ApiRequest/ApiRequest';

/**
 * Get full details of the tracks of a playlist owned by a Spotify user.<br/>
 * [Response format](https://developer.spotify.com/documentation/web-api/reference/playlists/get-playlists-tracks/#response-format)
 * @example ../../docs/Playlist/PlaylistTracks.md
 */
function PlaylistTracks(props) {
    let url = `https://api.spotify.com/v1/playlists/${props.id}/tracks`;
    let options = { ...props.options };

    return (
        <ApiRequest url={url} options={options}>
            {(data, loading, error) => props.children(data, loading, error)}
        </ApiRequest>
    );
}

PlaylistTracks.propTypes = {
    /** The Spotify ID for the playlist. */
    id: PropTypes.string.isRequired,
    /** Options object */
    options: PropTypes.shape({
        fields: PropTypes.string,
        limit: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        offset: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        market: PropTypes.string
    }),
    /** Process spotify data with render props using props.children as a function */
    children: PropTypes.func.isRequired
};

PlaylistTracks.defaultProps = {
    options: {}
};

export default PlaylistTracks;
