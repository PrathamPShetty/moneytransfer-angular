import { STATUS_FAILED, STATUS_NO_RECORDS, STATUS_SUCCESS } from "../../constants/api-constants"

export class ApiResponse {
    status: number
    data: any
    description: string
    recordCount: number


    constructor({
        status = STATUS_FAILED,
        data = null,
        description = '',
        recordCount = STATUS_NO_RECORDS,
    }) {
        this.status = status
        this.data = data
        this.description = status !== STATUS_SUCCESS && !description ? 'Unhandled api error' : description
        this.recordCount = recordCount
    }

    set setData(data: any) {
        this.data = data
    }

    get isSuccess() {
        return this.status === STATUS_SUCCESS
    }

    get showSuccesSnackBar() {
        return (!!(this.isSuccess && this.data && typeof this.data === 'string'))
    }

    get showErrorSnackbar() {
        return !this.isSuccess && this.description
    }
}
