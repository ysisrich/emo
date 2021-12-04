
import {get,post} from './axios'

/*
* 视频 Video
*
*/

export const getVideoList = (params={}) => get('/video/getVideoList',params);

export const addVideo = (params={}) => post('/video/addVideo',params);

export const getVideoOne = (params={}) => get('/video/getVideoOne',params);

export const getVideoRecommendList = (params={}) => get('/video/getVideoRecommendList',params);

export const putVideoOne = (params={}) => post('/video/putVideoOne',params);



/*
* 评论 Comment
*
*/

export const getCommentList = (params={}) => get('/comment/getCommentList',params);

export const addComment = (params={}) => post('/comment/addComment',params);

export const getCommentOne = (params={}) => get('/comment/getCommentOne',params);

export const getCommentRecommendList = (params={}) => get('/comment/getCommentRecommendList',params);

export const putCommentOne = (params={}) => post('/comment/putCommentOne',params);
