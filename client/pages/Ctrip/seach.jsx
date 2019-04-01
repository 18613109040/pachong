import React, { PureComponent, useState, useEffect } from "react";
import { Card, Row, Col, Select } from "antd";
import { connect } from 'dva';
import request from "../../utils/request";
import Debounce from 'lodash-decorators/debounce';
const Option = Select.Option;
@connect(({ }) => ({
}))
class Search extends PureComponent {
  constructor(props){
    super(props);
    this.state = {
      airports:[],
      code:''
    }
    this.handleSearch = this.handleSearch.bind(this)
  }
  
  componentDidMount(){
    
  }
  @Debounce(500)
  handleSearch(value){
    request(`/api/getpoicontent?key=${value}`,{
      method:'GET'
    })

  }
  handleChange=()=>{

  }
  render () {
    const { airports, code } = this.state
    const options = airports.map(d => <Option key={d.value}>{d.text}</Option>);
    return (
    <Card>
      <Row type="flex" justify="center">
        <Col>
          <Select defaultValue="Oneway" style={{ width: 120 }}>
            <Option value="Oneway">单程</Option>
            <Option value="Roundtrip">往返</Option>
            <Option value="Multiple">多程</Option>
          </Select>
        </Col>
        <Col>
          <Select
            showSearch
            value={code}
            placeholder='出发城市'
            style={{ width: 200 }}
            defaultActiveFirstOption={false}
            showArrow={false}
            filterOption={false}
            onSearch={this.handleSearch}
            onChange={this.handleChange}
          >
              {options}
          </Select>
        </Col>
        <Col />
        <Col />
      </Row>
    </Card>
    )
  }
}

export default Search
// function Search() {
//   const [code, setCode] = useState("");
//   const [airports, setAirports] = useState([]);
//   useEffect(() => {});
 
//   function handleSearch(value){
//     console.dir(value)
//     request(`/api/getpoicontent?key=${value}`,{
//       method:'GET'
//     })

//   }
//   function handleChange(){

//   }
//   const options = airports.map(d => <Option key={d.value}>{d.text}</Option>);
//   return (
//     <Card>
//       <Row type="flex" justify="center">
//         <Col>
//           <Select defaultValue="Oneway" style={{ width: 120 }}>
//             <Option value="Oneway">单程</Option>
//             <Option value="Roundtrip">往返</Option>
//             <Option value="Multiple">多程</Option>
//           </Select>
//         </Col>
//         <Col>
//           <Select
//             showSearch
//             value={code}
//             placeholder='出发城市'
//             style={{ width: 200 }}
//             defaultActiveFirstOption={false}
//             showArrow={false}
//             filterOption={false}
//             onSearch={handleSearch}
//             onChange={handleChange}
//           >
//               {options}
//           </Select>
//         </Col>
//         <Col />
//         <Col />
//       </Row>
//     </Card>
//   );
// }
// export default Search;
