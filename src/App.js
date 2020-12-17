
import './App.css';
import FormRedux from "./form";
import Users from "./table";
import 'antd';
import {Provider} from 'react-redux'
import store from "./Redux/store";

function App() {
  return (
      <Provider store={store}>
    <div className="App">
        <FormRedux />
    </div>
        <div>

        </div>
      </Provider>
  );
}

export default App;
