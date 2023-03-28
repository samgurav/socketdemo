import axios from 'axios';
import { MAIN_URL } from './Url';
export function getPosts(){
    return axios.get(`${MAIN_URL}posts/getcomment`);
}
export function addPost(){
    return axios.post(`${MAIN_URL}posts/postdata`);
}