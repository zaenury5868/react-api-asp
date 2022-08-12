import {tsConstructorType} from  '@babel/types';
import React, {Component} from 'react';
import {Variable, variables} from './Variable.js';
export class Department extends Component{
    constructor(props){
        super(props);
        this.state = {
            departments:[],
            modalTitle:"",
            DepartmentName:"",
            DepartmentId:0
        }
    }

    refreshList(){
        fetch(variables.API_URL+"department")
        .then(response=>response.json())
        .then(data=>{
            this.setState({departments:data});
        });
    }

    componentDidMount(){
        this.refreshList();
    }

    setName = (e) => this.setState({ DepartmentName: e.target.value });

    addClick(){
        this.setState({
            modalTitle:"Tambah Departemen",
            DepartmentId:0,
            DepartmentName:""
        });
    }

    editClick(dep){
        this.setState({
            modalTitle:"Ubah Departemen",
            DepartmentId:dep.DepartmentId,
            DepartmentName:dep.DepartmentName
        });
    }

    createClick(){
        fetch(variables.API_URL+'department', {
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                DepartmentName:this.state.DepartmentName
            })
        }).then(res=>res.json())
            .then((result)=>{
                alert(result);
                this.refreshList();
        },(error)=>{
            alert('Failed');
        })
    }

    updateClick(){
        fetch(variables.API_URL+'department', {
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                DepartmentName:this.state.DepartmentName
            })
        }).then(res=>res.json())
            .then((result)=>{
                alert(result);
                this.refreshList();
        },(error)=>{
            alert('Failed');
        })
    }

    deleteClick(id){
        if(window.confirm('Apa anda yakin ?')){
            fetch(variables.API_URL+'department/'+id, {
                method:'DELETE',
                headers:{
                    'Accept':'application/json',
                    'Content-Type':'application/json'
                }
            }).then(res=>res.json())
                .then((result)=>{
                    alert(result);
                    this.refreshList();
            },(error)=>{
                alert('Failed');
            })
        }
    }

    render(){
        const {
            departments,
            modalTitle,
            DepartmentId,
            DepartmentName
        }=this.state;

        return(
            <div>
                <button type="button" className="btn btn-primary m-2 float-end" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={()=>this.addClick()}>Tambah Departemen</button>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>id</th>
                            <th>nama departemen</th>
                            <th>opsi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {departments.map(dep=>
                            <tr key = {dep.DepartmentId}>
                                <td>{dep.DepartmentId}</td>
                                <td>{dep.DepartmentName}</td>
                                <td>
                                    <button type="button" className="btn btn-light mr-1" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={()=>this.editClick(dep)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                            <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                                        </svg>
                                    </button>    
                                    <button type="button" className="btn btn-light mr-1" onClick={()=>this.deleteClick(dep.DepartmentId)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash3-fill" viewBox="0 0 16 16">
                                            <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z"/>
                                        </svg>
                                    </button>    
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
                <div className="modal fade" id="exampleModal" tabIndex="-1" arie-hidden="true">
                    <div className="modal-dialog modal-lg modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">{modalTitle}</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-hidden="Close"></button>
                            </div>
                            <div className="modal-body">
                                <div className="input-group mb-3">
                                    <span className="input-group-text">Nama Departemen</span>
                                    <input type="text" className="form-control" value={DepartmentName} onChange={this.setName} />
                                </div>
                                {DepartmentId==0?<button type="button" className="btn btn-primary float-start" onClick={()=>this.createClick()}>Create</button> : null}
                                {DepartmentId!=0?<button type="button" className="btn btn-primary float-start" onClick={()=>this.updateClick()}>Update</button> : null}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}