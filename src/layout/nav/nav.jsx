import React, { Component } from 'react'
import { NavBar, Space, Toast } from 'antd-mobile'
import { SearchOutline} from 'antd-mobile-icons'

export default class nav extends Component {
  render() {
    const {navInfo} = this.props
      const right = (
    <div style={{ fontSize: 24 }}>
      <Space style={{ '--gap': '16px' }}>
        <SearchOutline />
        {/* <MoreOutline /> */}
      </Space>
    </div>
  )
  const back = () =>
    Toast.show({
      content: '点击了返回区域',
      duration: 1000,
    })
    return (
        <NavBar right={right} onBack={back}>
          {navInfo?.title}
        </NavBar>
    )
  }
}
