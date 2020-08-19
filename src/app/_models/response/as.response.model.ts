import { LoadClassesResponse } from './laod.class.response';
import { AssignmentResponseModel } from './assignment.response.model';
import { RegisterUserResponseModel } from './register.user.response';

export class ASResponseModel {
    assignmentName:string;
    assignmentId: number;
    classes: LoadClassesResponse[];
    assignnemnts: AssignmentResponseModel[];
    users: RegisterUserResponseModel[];
}