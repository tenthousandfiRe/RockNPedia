import React, { createRef } from "react";
import "./style.css";
import { connect } from 'react-redux';
import { IStore } from '../../../interfaces/IStore'
import { IBand } from '../../../interfaces/IBand'
import { IAccount } from '../../../interfaces/IAccount'
import { API_URL, defaultBandImage } from '../../../constants'
import { SetBandAction, SetBandsAction } from '../../../redux/actions'
import { myFetch } from '../../../utils'
const URL_bandupdate = `${API_URL}/avatars/`

interface IProps {
    account?: IAccount
    band: IBand
    history: any
    match: any
}

interface IGlobalActionProps {
    setBand(band: IBand): void
    setBands(band: IBand[]): void

}

interface IState {
    band_id: number | null,
    name?: string,
    foundation_year?: number,
    band_image: string,
    created_by: 0,
    error: string,
    band_history: string
}

type TProps = IProps & IGlobalActionProps;

class EditBand extends React.PureComponent<TProps, IState> {
    inputFileRef: React.RefObject<HTMLInputElement>;
    constructor(props: TProps) {
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
        const { name, foundation_year } = this.state;
        const band_id = this.props.match.params.id
        if (this.inputFileRef.current?.files) {
            const formData = new FormData();
            const token = localStorage.getItem("token");
            const band_image = this.inputFileRef.current.files[0];
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
            this.props.history.push('/');
        }
    }


    deleteBand(band_id: number) {
        const token = localStorage.getItem("token")
        myFetch({ method: "DELETE", path: `/bands/delete/${band_id}`, token }).
            then(this.props.history.push(`/`)
            )
    }

    componentDidMount() {
        const band_id = this.props.match.params.id
        console.log(band_id)
        myFetch({ path: `/bands/${band_id}` }).then(json =>
            this.props.setBand(json)
        )
    }

    render() {
        const { band } = this.props;
        const { band_image, band_history } = band
        let { name = band?.name, band_id } = this.state
        let { foundation_year = band?.foundation_year } = this.state
        return (
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
                    <div className="historyBackground"><p>{band_history}</p></div>
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
                                        onChange={(e: any) => this.setState({ foundation_year: e.target.value })}
                                    ></input>
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
                                        <button className="btn btn-outline-dark mt-3 buttonsEditBand" style={{ marginLeft: 10 }} onClick={() => this.deleteBand(band_id as any)}>
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


