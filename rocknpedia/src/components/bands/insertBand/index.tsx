import React, { createRef } from "react";
import { myFetch } from '../../../utils'
import { IAccount } from '../../../interfaces/IAccount'

interface IProps {
    account: IAccount
}

interface IGlobalActionProps {
}

interface IState {
    name: string;
    foundation_year: any;
    band_image: string;
    error: string;
    history: string;
}


class InsertBand extends React.PureComponent<any, IState> {
    inputFileRef: React.RefObject<HTMLInputElement>;
    constructor(props: any) {
        super(props);

        this.inputFileRef = createRef();


        this.state = {
            name: "",
            foundation_year: null,
            band_image: "",
            error: "",
            history: ""
        }

        this.insertBand = this.insertBand.bind(this);
        this.onNameChange = this.onNameChange.bind(this)
        this.onFoundationYearChange = this.onFoundationYearChange.bind(this)
        this.insertBand = this.insertBand.bind(this)
    }

    onNameChange(event: any){
        const name = event.target.value;
        this.setState({name})
        console.log(name)
    }

    onFoundationYearChange(event: any){
        const foundation_year = event.target.value;
        this.setState({foundation_year})
        console.log(foundation_year)
    }

    insertBand() {
        const { name,  foundation_year } = this.state;
        if (this.inputFileRef.current?.files) {
          const formData = new FormData();
          const token = localStorage.getItem("token");
          const band_image = this.inputFileRef.current.files[0];
            console.log(band_image)
          formData.append("band_image", band_image);
          formData.append("name", name)
          formData.append("foundation_year", foundation_year)
          myFetch({ method: "POST", path: "/bands/", token, formData }).then(
            json => {
              if (json) {
                console.log(json);
              }
            }
          );
          this.inputFileRef.current.value = "";
        }
      }


    render() {
        const { name, foundation_year,band_image, history } = this.state
        console.log(this.state)
        console.log(this.state.band_image)

        return(
            <>
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
                <div className="select">
                  <input
                    className="form-control"
                    type="number"
                    value={foundation_year}
                    onChange={this.onFoundationYearChange}
                  >
                  </input>
                </div>
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
              <br />
              <button className="btn btn-primary" onClick={this.insertBand}>
                Subir imagen
              </button>
              <div className="row"></div>
            </div>
          </div>
        </div>
            <div className="field is-grouped">
              <div className="control">
                <button
                  className="btn btn-info mt-3 "
                  disabled={name.length === 0}
                  onClick={this.insertBand}
                  data-dismiss="modal"
                >
                  Enviar
                </button>
                {this.state.error}
              </div>
            </div>
          </div>
        </div>

        
      </>
        )
    }
}

export default(InsertBand)