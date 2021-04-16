import './App.css';
import { Component } from 'react';
import Customer from './components/Customer';
import {Table, TableHead, TableBody, TableRow, TableCell, Paper} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX : "auto"
  },
  table: {
    minWidth: 1080
  }

})
const customers = [
  {
    'id':1,
    'image': 'https://placeimg.com/64/64/1',
    'name': '박상혁',
    'gender': '남자',
    'job': '개발자'
  },
  {
    'id':2,
    'image': 'https://placeimg.com/64/64/2',
    'name': '홍길동',
    'gender': '남자',
    'job': '보디가드'
  },
  {
    'id':3,
    'image': 'https://placeimg.com/64/64/3',
    'name': '이순신',
    'gender': '남자',
    'job': '디자이너'
  },
]
class App extends Component {
  render () {
    const {classes } = this.props
    return (
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>번호</TableCell>
              <TableCell>이미지</TableCell>
              <TableCell>이름</TableCell>
              <TableCell>성별</TableCell>
              <TableCell>직업</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {customers.map( (c) => { return <Customer id={c.id} image={c.image} name={c.name} gender={c.gender} job={c.job}/> })}
          </TableBody>
        </Table>
      </Paper>
    )
  }
  
}

export default withStyles(styles)(App);

