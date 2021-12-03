
import {createApp} from 'app';
import App from './App.vue'

const app = createApp(App);
import 'ant-design-vue/dist/antd.css';
import {
    Affix,
    AutoComplete,
    Avatar,
    Button,
    Card,
    Col,
    DatePicker,
    FormModel,
    Icon,
    Input,
    Layout,
    Menu,
    Modal,
    Pagination,
	Popconfirm,
    Radio,
    Row,
    Select,
    Spin,
    Tag,
	Table,
    Tooltip,
    Upload,
    Drawer,
	Divider,
    Skeleton,
    Result,
    Descriptions,
    Space,
	message
} from 'ant-design-vue';

app.use(Affix);
app.use(AutoComplete);
app.use(Avatar);
app.use(Button);
app.use(Col);
app.use(DatePicker);
app.use(FormModel);
app.use(Icon);
app.use(Input);
app.use(Layout);
app.use(Menu);
app.use(Modal);
app.use(Pagination);
app.use(Popconfirm);
app.use(Radio);
app.use(Row);
app.use(Select);
app.use(Spin);
app.use(Card);
app.use(Tag);
app.use(Table);
app.use(Tooltip);
app.use(Upload);
app.use(Drawer);
app.use(Divider);
app.use(Skeleton);
app.use(Result);
app.use(Descriptions);
app.use(Space);


// app.prototype.$message = message