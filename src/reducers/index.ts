import { combineReducers } from "redux";
import { loginReducer } from "./Login.reducer";
import { navReducer } from "./Nav.reducer";
import { userReducer } from "./User.reducer";
import { userInfo } from 'os';
import { surveyListReducer } from "./SurveyList.reducer";

export interface ILoginState {
  username: string,
  password: string,
  userInfo: {},
  errorMessage: string
}

export interface IUserState {
  isLoggedIn: boolean,
  username: string
}

export interface INavState {
  bOpenLinkClicked: boolean,
  bClosedLinkClicked: boolean 
}

export interface ISurveyListState {
  publicSurveys: ISurveyItem[],
  privateSurveys: ISurveyItem[]

}

// For declarations
export interface ISurveyItem {
    id: number
    title: string
    creator: string
    description: string
    dateCreated: Date
    dateClosed: Date
    status: {
      statusId: number,
      status: string
    },
    privacy: {
      privacyId: number,
      privacy: string
    } 
  }

export interface IState {
  login: ILoginState
  user: IUserState
  nav: INavState
  surveyLists: ISurveyListState
}

export const state = combineReducers<IState>({
  login: loginReducer,
  user: userReducer,
  nav: navReducer,
  surveyLists: surveyListReducer
})