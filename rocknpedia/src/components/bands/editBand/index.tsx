import React from 'react'
import { connect } from 'react-redux';
import { IStore } from '../../../interfaces/IStore'
import { IBand } from '../../../interfaces/IBand'
import { IAccount } from '../../../interfaces/IAccount'
import { API_URL } from '../../../constants'
<<<<<<< Updated upstream
=======
import "./style.css";
>>>>>>> Stashed changes

interface IProps {
    account?: IAccount
    band: IBand
}

interface IGlobalActionProps {
}

interface IState {}

type TProps = IProps & IGlobalActionProps;

class EditBand extends React.PureComponent<TProps, IState> {
    constructor(props: TProps) {
        super(props)

        this.state = {
        }
    }

    render() {
        const { band } = this.props
        const { band_id, name, foundation_year, band_image } = band
        return(
            <div>
                <div className="container">
                    <div className="row" style={{textAlign: "center", marginTop: 50}}>
                        <div className="col-6 bandDivs"></div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = ({ band, account }: IStore) => ({ band, account });


export default connect(mapStateToProps, null)(EditBand)


