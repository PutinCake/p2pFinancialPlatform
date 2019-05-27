/*选择用户头像UI组件 */
import React, {Component} from 'react';
import {List, Grid} from 'antd-mobile';
import PropTypes from 'prop-types';



export default class HeaderSelector extends Component {

    static propType ={
        setHeader:PropTypes.func.isRequired
    }

    state={
        icon:null
    }

    constructor(props) {
        super(props);

        this.headerList = [];
        for(let i = 0; i<20; i++) {
            this.headerList.push({
                text:'头像'+(i+1),
                icon:require(`./images/头像${i+1}.png`),
            })
        }
    }

    selectHeader =({icon, text}) => {
        this.setState({icon});
        this.props.setHeader(text);
    }

    render(){
        const {icon} = this.state;
        const gridHeader = icon ? <p>已选择头像: <img src={icon} alt="header"/></p> : '请选择头像'
        return (
            
            //头部界面
            <List renderHeader={() => gridHeader}>
                <Grid data={this.headerList}
                      columnNum={5}
                      onClick={this.selectHeader}>
                </Grid>
            </List>
            
        )
    }
}