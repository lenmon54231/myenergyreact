import React from "react";
import Nav from '../../layout/nav/nav'
import  HomeInnerTest from './homeInnerTest/homeInnerTest'
import { getHomeTestList} from  '../../api/home/home'

export default class Home extends React.Component {
  componentDidMount(){
    getHomeTestList().then((res)=>{
      this.state.testList.push(...res?.result)
      this.setState({
        testList:  res?.result
      })
    })
  }
  constructor(props) {
    super(props);
    this.state = {
      testList:  [
      ],
      navInfo : {title:'我的能量'}
    };
  }
  render() {
    return (
      <div>
        <Nav navInfo={ this.state.navInfo }/>
        <div>
            {this.state.testList.map((e)=>{
return <div key={e?.id}><HomeInnerTest testInfo={e}/></div>
            })}
        </div>
      </div>
    );
  }
}
