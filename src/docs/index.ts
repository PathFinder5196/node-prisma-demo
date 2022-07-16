
import basicInfo from './basicInfo';
import servers from './servers';
import components from './components';
import tags from './tags';
import auth from './auth';
import preference from './preference';
import user from './user';

const docs = {
    ...basicInfo,
    ...servers,
    ...components,
    ...tags,
    paths: {
        ...auth,
        ...preference,
        ...user
    }
};

export default docs