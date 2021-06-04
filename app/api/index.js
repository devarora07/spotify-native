import axios from 'axios';
import url from '../constants/url';

const getRandom = async () => {
  return await axios
    .get(url + '/random')
    .then((res, err) => {
      if (err) {
        console.log('err');
      }
      return res.data;
    })
    .catch((err) => {
      console.log('err', err);
    });
};

module.exports = {getRandom};
