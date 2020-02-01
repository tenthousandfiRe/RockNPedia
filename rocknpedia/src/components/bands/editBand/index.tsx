import React, { createRef } from "react";
import { connect } from 'react-redux';
import { IStore } from '../../../interfaces/IStore'
import { IBand, IBands } from '../../../interfaces/IBand'
import { IAccount } from '../../../interfaces/IAccount'
import { myFetch } from "../../../utils";
import { SetBandAction } from '../../../redux/actions'
import { API_URL } from '../../../constants'
const URL_bandupdate = `${API_URL}/avatars/`

interface IProps {
    band: IBand
    account: IAccount
}

interface IGlobalActionProps {
    setBand(band: IBand): void

}

interface IState {
    name: string,
    foundation_year: number,
    band_image: string,
    created_by: 0,
    error: string,
    history: string
}

type TProps = IProps & IGlobalActionProps;

class EditBand extends React.PureComponent<TProps, IState> {
    inputFileRef: React.RefObject<HTMLInputElement>;
    constructor(props: TProps) {
        super(props);

        this.inputFileRef = createRef();

        this.state = {
            name: "",
            foundation_year: 0,
            band_image: "",
            created_by: 0,
            error: "",
            history: ""
        };

        this.updateBand = this.updateBand.bind(this);

    }

    onNameChange(event: any) {
        const name = event.target.value;
        this.setState({ name });
        console.log(name);
    }

    onFoundationYearChange(event: any) {
        const foundation_year = event.target.value;
        this.setState({ foundation_year });
        console.log(foundation_year);
    }

    updateBand() {
        const { name, foundation_year, created_by } = this.state;
        const { band_id } = this.props.band
        if (this.inputFileRef.current?.files) {
            const formData = new FormData();
            const token = localStorage.getItem("token");
            const band_image = this.inputFileRef.current.files[0];
            console.log(band_image);
            formData.append("band_image", band_image);
            formData.append("name", name);
            // formData.append("foundation_year", foundation_year);
            formData.append("created_by", created_by as any);
            myFetch({ method: "POST", path: `/bands/update/${band_id}`, token, formData }).then(
                json => {
                    if (json) {
                        this.props.setBand(json);
                    }
                }
            );
            this.inputFileRef.current.value = "";
        }
    }

    render() {
        const { band } = this.props
        const { band_id, name, foundation_year, band_image } = band
        return (
            <div className="container">
                <div className="row">
                    <div className="col-6">
                    <img style={{ width: "100%", height: "100%" }} src={URL_bandupdate + band_image} className="card-img" alt="..."></img>
                    </div>
                    <div className="col-6">
                        <div className="col-6">
                            <div className="card-content">
                                <div className="form">
                                    <label className="label">
                                        <strong>Nombre de banda</strong>
                                    </label>
                                    <div className="control">
                                        <input
                                            className="form-control"
                                            type="text"
                                            value={name}
                                            onChange={this.onNameChange}
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
                                            maxLength={4}
                                            value={foundation_year}
                                            onChange={this.onFoundationYearChange}
                                        ></input>
                                    </div>
                                </div>
                                <div className="container-fluid">
                                    <div className="row">
                                        <div className="col-12">
                                            <label className="mt-3">Imagen</label>
                                            <br />
                                            <div className="col-2 border">
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
                                            <button
                                                className="btn btn-info mt-3 "

                                                onClick={this.updateBand}
                                                data-dismiss="modal"
                                            >
                                                Enviar
                  </button>
                                            {this.state.error}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = ({ band, account }: IStore) => ({ band, account });

const mapDispatchToProps = ({
    setBand: SetBandAction
})


export default connect(mapStateToProps, mapDispatchToProps)(EditBand)


