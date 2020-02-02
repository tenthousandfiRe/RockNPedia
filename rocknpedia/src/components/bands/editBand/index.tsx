import React, { createRef } from "react";
import { connect } from 'react-redux';
import { IStore } from '../../../interfaces/IStore'
import { IBand } from '../../../interfaces/IBand'
import { IAccount } from '../../../interfaces/IAccount'
import { myFetch } from "../../../utils";
import { SetBandAction, SetBandsAction } from '../../../redux/actions'
import { API_URL } from '../../../constants'
import { defaultBandImage } from '../../../constants'
const URL_bandupdate = `${API_URL}/avatars/`

interface IProps {
    band: IBand
    history: any
}

interface IGlobalActionProps {
    setBand(band: IBand): void
    setBands(band: IBand[]): void

}

interface IState {
    name?: string,
    foundation_year?: number,
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
            name: this.props.band.name,
            foundation_year: this.props.band.foundation_year,
            band_image: "",
            created_by: 0,
            error: "",
            history: ""
        };

        this.updateBand = this.updateBand.bind(this);

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
            formData.append("name", name as any);
            formData.append("foundation_year", foundation_year as any);
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

    getBand() {
        const { band_id } = this.props.band
        myFetch({ path: `/bands/${band_id}` }).then(json => {
            this.props.setBand(json)
        })
    }

    deleteBand(band_id: number){
        const token = localStorage.getItem("token")
        myFetch({ method: "DELETE", path: `/bands/delete/${band_id}`, token }).
        then(this.props.history.push(`/`)
        )
    }

    componentShouldMount() {
        this.getBand()
    }

    render() {
        const { band } = this.props
        const { band_id, name, foundation_year, band_image } = band
        return (
            <div className="container editBandDiv">
                <div className="row">
                    <div className="col-12" style={{ textAlign: "center" }}>
                        <h1 style={{ color: "white" }}>{name}</h1>
                    </div>
                </div>
                <div className="row">
                    <div className="col-6">
                        <img style={{ width: 500, height: 500 }} src={band_image ? URL_bandupdate + band_image : defaultBandImage} className="card-img" alt="..."></img>
                    </div>
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
                                        value={this.state.name}
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
                                        maxLength={4}
                                        value={this.state.foundation_year}
                                        onChange={(e: any) => this.setState({ foundation_year: e.target.value })}
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
                                <div className="field is-grouped buttons">
                                    <div className="control">
                                        <button className="btn btn-info mt-3 buttons" onClick={this.updateBand}>
                                            Enviar
                                        </button>
                                        <button className="btn btn-info mt-3 buttons" onClick={() => this.deleteBand(band_id as any)}>
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
        )
    }
}

const mapStateToProps = ({ band }: IStore) => ({ band });

const mapDispatchToProps = ({
    setBand: SetBandAction,
    setBands: SetBandsAction
})


export default connect(mapStateToProps, mapDispatchToProps)(EditBand)


