
import {get,post} from './axios'

/*
* 视频Video
*
*/

export const getVideoList = (params={}) => get('/api/video/getVideoList',params);

export const addVideo = (params={}) => post('/api/video/addVideo',params);

export const getVideoOne = (params={}) => get('/api/video/getVideoOne',params);

export const putVideoOne = (params={}) => post('/api/video/putVideoOne',params);

