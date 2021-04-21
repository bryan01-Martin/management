import './App.css';
import { Component } from 'react';
import Customer from './components/Customer';
import CustomerAdd from './components/CustomerAdd';
import {Table, TableHead, TableBody, TableRow, TableCell, Paper, CircularProgress} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
    overflowX : "auto"
  },
  table: {
    minWidth: 1080
  }

})

class App extends Component {
  state = {
    customers : ''
  }

  componentDidMount() {
    this.callApi().then(res => this.setState({customers: res})).catch(err => console.log(err));
  }

  callApi = async () => {
    const response = await fetch('/api/customers');
    const data = response.json();
    return data;
  }
  render () {
    const { classes } = this.props
    return (
      <>
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
              {this.state.customers ? this.state.customers.map( (c) => { return <Customer key={c.ID} id={c.ID} image={c.IMAGE} name={c.NAME} gender={c.GENDER} job={c.JOB}/> }) :
              <TableRow>
                <TableCell colSpan="5" align="center">
                  <CircularProgress />
                </TableCell>
              </TableRow>
              }
            </TableBody>
          </Table>
        </Paper>
        <CustomerAdd/>
      </>
    )
  }
  
}

export default withStyles(styles)(App);

