import React, { createRef } from "react";
import "./style.css";
import { connect } from 'react-redux';
import { API_URL, defaultBandImage } from '../../../constants'
import { SetBandAction, SetBandsAction } from '../../../redux/actions'
import { myFetch } from '../../../utils'
import CKEditor from 'ckeditor4-react';
import ReactHtmlParser from 'react-html-parser';
import Swal from 'sweetalert2'
const URL_bandupdate = `${API_URL}/avatars/`



class EditBand extends React.PureComponent {
    constructor(props) {
        super(props);

        this.inputFileRef = createRef();

        this.state = {
            band_id: null,
            name: this.props.band.name,
            foundation_year: this.props.band.foundation_year,
            band_image: "",
            created_by: 0,
            error: "",
            band_history: ""
        };

        this.updateBand = this.updateBand.bind(this);

    }

    updateBand() {
        const { name, foundation_year, band_history } = this.state;
        const band_id = this.props.match.params.id
        if (this.inputFileRef.current?.files) {
            const formData = new FormData();
            const token = localStorage.getItem("token");
            const band_image = this.inputFileRef.current.files[0];
            formData.append("band_image", band_image);
            formData.append("name", name);
            formData.append("foundation_year", foundation_year);
            formData.append("band_history", band_history);
            myFetch({ method: "POST", path: `/bands/update/${band_id}`, token, formData }).then(
                json => {
                    if (json) {
                        this.props.setBand(json);
                    }
                }
            );
            this.inputFileRef.current.value = "";
            const Toast = Swal.mixin({
                toast: true,
                position: 'center',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                onOpen: (toast) => {
                  toast.addEventListener('mouseenter', Swal.stopTimer)
                  toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
              })
              
              Toast.fire({
                icon: 'success',
                title: 'Banda actualizada!'
              })
            this.props.history.push(`/`);
        }
    }

    onBandHistoryChange(e) {
        this.setState({
            band_history: e.editor.getData()
        });
    }


    deleteBand(band_id) {
        const token = localStorage.getItem("token")
        myFetch({ method: "DELETE", path: `/bands/delete/${band_id}`, token }).
            then(this.props.history.push(`/`)
            )
    }

    componentDidMount() {
        const band_id = this.props.match.params.id
        myFetch({ path: `/bands/${band_id}` }).then(json =>
            this.props.setBand(json)
        )
    }

    render() {
        const { band } = this.props;
        const { band_image, band_history } = band;
        const band_id = this.props.match.params.id;
        let { name = band?.name } = this.state
        let { foundation_year = band?.foundation_year } = this.state
        return (
            <>
            <div className="separationDiv"></div>
            <div className="container">
                <div className="container titleContainer">
                    <div className="row">
                        <div className="col-12">
                            <h1>{name}</h1>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-4 align-items-center d-flex">
                        {band_history ? <div className="historyBackground"><p>{ReactHtmlParser(`${band_history}`)}</p></div> : ""}
                    </div>
                    <div className="col-2"></div>
                    <div className="col-5 backform d-flex justify-content-center align-items-center">
                        <div className="bandDivsEditImage">
                            <img src={band_image ? URL_bandupdate + band_image : defaultBandImage} className="card-img" alt="..."></img>
                        </div>
                        <div className="card-content">
                            <div className="form">
                                <label className="label">
                                    <strong>Nombre de banda</strong>
                                </label>
                                <div className="control">
                                    <input
                                        className="form-control"
                                        style={{ backgroundColor: "transparent" }}
                                        type="text"
                                        value={name ? name : band.name}
                                        onChange={(e) => this.setState({ name: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div className="field">
                                <label className="label">
                                    <strong>Año de fundación</strong>
                                </label>
                                <div className="control">
                                    <input
                                        className="form-control"
                                        type="number"
                                        style={{ backgroundColor: "transparent" }}
                                        maxLength={4}
                                        value={foundation_year ? foundation_year : band.foundation_year}
                                        onChange={(e) => this.setState({ foundation_year: e.target.value })}
                                    ></input>
                                </div>
                            </div>
                            <div className="field">
                                <button type="button" className="btn btn-outline-dark mt-3 buttonsEditBand" data-toggle="modal" data-target="#UE_history">
                                    Añade/Edita la historia</button>
                                <div className="control">
                                    <div class="modal fade" id="UE_history" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                        <div class="modal-dialog" role="document">
                                            <div class="modal-content modalBackground">
                                                <div class="modal-header">
                                                    <h5 class="modal-title" id="exampleModalLabel">Edita la historia</h5>
                                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                        <span aria-hidden="true">&times;</span>
                                                    </button>
                                                </div>
                                                <div class="modal-body">
                                                    <CKEditor
                                                        type="inline"
                                                        style={{ borderBottom: "1px solid black"}}
                                                        config={{
                                                            toolbar: [['Bold', 'Italic', 'Cut', 'Copy', 'Paste']]
                                                        }}
                                                        data={band_history}
                                                        onChange={e => this.onBandHistoryChange(e)}
                                                    />
                                                </div>
                                                <div class="modal-footer">
                                                    <button type="button" className="btn btn-outline-dark mt-3 buttonsEditBand" data-dismiss="modal">Cerrar</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                            <div className="container-fluid">
                                <div className="row">
                                    <div className="col-12">
                                        <label className="mt-3">Pincha aquí para subir otra imagen</label>
                                        <br />
                                        <div className="col-12 d-flex justify-content-center">
                                            <input
                                                type="file"
                                                className="custom-file-input"
                                                ref={this.inputFileRef}
                                            />
                                        </div>

                                        <div className="row"></div>
                                    </div>
                                </div>
                                <div className="field is-grouped">
                                    <div className="control">
                                        <button className="btn btn-outline-dark mt-3 buttonsEditBand" onClick={this.updateBand}>
                                            Enviar
                                        </button>
                                        <button className="btn btn-outline-dark mt-3 buttonsEditBand" style={{ marginLeft: 10 }} onClick={() => this.deleteBand(band_id)}>
                                            Borrar banda
                                        </button>
                                        {this.state.error}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </>
        )
    }
}

const mapStateToProps = ({ band }) => ({ band });

const mapDispatchToProps = ({
    setBand: SetBandAction,
    setBands: SetBandsAction
})


export default connect(mapStateToProps, mapDispatchToProps)(EditBand)


