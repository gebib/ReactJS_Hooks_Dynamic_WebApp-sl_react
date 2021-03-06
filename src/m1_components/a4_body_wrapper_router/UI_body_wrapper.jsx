import React, {Suspense, useEffect, useRef, useState} from 'react';
import "./ST_body_wrapper.scss";
import {Redirect, Route, Switch, useHistory, useLocation} from "react-router-dom";
import {HomeContent} from "./p1_home/HomeContent";
import {ErrorPage} from "../../m0_pages_routes/ErrorPage";
import {JobsContent, UI_Jobs} from "./p2_jobs/job_list_view/UI_Jobs";
import {UI_ServiceContent} from "./p3_services/UI_ServiceContent";
import {UI_Blog} from "./p4_blog/UI_Blog";
import {AboutContent} from "./p5_about/AboutContent";
import {UI_login} from "../c1_auth/login/UI_login";
import {UI_register} from "../c1_auth/register/UI_register";
import {FullPageLoader} from "../../resources/miscellaneous/FullPageLoader";
import {UI_forgot_password} from "../c1_auth/forgot_password/UI_forgot_password";
import {UI_PrivacyPolicy} from "../z_privacy_policy/UI_PrivacyPolicy";
import {UI_Job_Viewer} from "./p2_jobs/job_Viewer/UI_Job_Viewer";
import {Jobs_form} from "./p2_jobs/job_form/Jobs_form";
import {UI_blog_view} from "./p4_blog/blog_View/UI_blog_view";
import {UI_vibryross} from "./p1_home/vibryross/UI_vibryross";
import {UI_recruitment} from "./p1_home/own/UI_own";
import {UI_leie} from "./p1_home/leie/UI_leie";
import {useTranslation} from "react-i18next";
import {useAuth} from "../c1_auth/a0_auth_common/firebase/AuthContext";
import {UI_advice} from "./p1_home/advice/UI_advice";
import {showToast} from "../../UI_Main_pages_wrapper";

//redirect case user is not admin for particular routes!
export const UI_body_wrapper = (props) => {

    const {t, i18n} = useTranslation("SL_languages");
    const {currentUserInfo} = useAuth();
    const location = useLocation();
    const history = useHistory();

    useEffect(() => {
        if ((currentUserInfo !== null) && (location.pathname === "/login" ||
            location.pathname === "/register" ||
            location.pathname === "/privacypolicy" ||
            location.pathname === "/forgot_password")) {
            showToast(t("fof.youAreIn"));
        }
        return () => {
            //cleanup
        }
    }, [/*deps*/]);

    return (
        <div className={"body_outer"}>
            <div className={"body_wrapper"} style={{height: props.wrapperHeight}}>
                <Switch>
                    <Route exact path={"/"}><HomeContent/></Route>

                    {/*//////jobs page//////////*/}
                    <Route exact path={"/jobs"}><UI_Jobs/></Route>
                    <Route exact path={"/jobs/jobview/:id"}><UI_Job_Viewer/></Route>

                    {/*admin only routes*/}
                    {currentUserInfo && currentUserInfo[2] &&
                    <Route exact path={"/jobs/jobeditor"}><Jobs_form/></Route>}
                    {currentUserInfo && currentUserInfo[2] &&
                    <Route exact path={"/jobs/jobeditor/:id"}><UI_Job_Viewer/></Route>}

                    {/*normail pages*/}
                    <Route exact path={"/blog/blogview/:id"}><UI_blog_view/></Route>

                    <Route exact path={"/services"}><UI_ServiceContent/></Route>
                    <Route exact path={"/blog"}><UI_Blog/></Route>
                    <Route exact path={"/about"}><AboutContent/></Route>


                    <Route exact path={"/privacypolicy"}><UI_PrivacyPolicy/></Route>
                    <Route exact path={"/home/wecare"}><UI_vibryross/></Route>
                    <Route exact path={"/home/own"}><UI_recruitment/></Route>
                    <Route exact path={"/home/rent"}><UI_leie/></Route>

                    <Route exact path={"/service/wecare"}><UI_vibryross/></Route>
                    <Route exact path={"/service/own"}><UI_recruitment/></Route>
                    <Route exact path={"/service/rent"}><UI_leie/></Route>
                    <Route exact path={"/service/advice"}><UI_advice/></Route>

                    <Route path={"/badurl404"}><ErrorPage/></Route>

                    {(currentUserInfo === null) ? <Suspense fallback={FullPageLoader}>
                        <Route exact path={"/login"}><UI_login/></Route>
                        <Route exact path={"/register"}><UI_register/></Route>
                        <Route exact path={"/forgot_password"}><UI_forgot_password/></Route>
                        {(location.pathname !== "/login" ||
                            location.pathname !== "/register" ||
                            location.pathname !== "/privacypolicy" ||
                            location.pathname !== "/forgot_password")&&<Route path={"*"}><ErrorPage/></Route>}
                    </Suspense> : (location.pathname === "/login" ||
                        location.pathname === "/register" ||
                        location.pathname === "/privacypolicy" ||
                        location.pathname === "/forgot_password")?<Redirect to={"/"}/>:<Redirect to={"/badurl404"}/>}}
                    {/*<Redirect to={"/"}/>*/}

                    <Route path={"*"}><ErrorPage/></Route>
                </Switch>
            </div>
        </div>
    );
};
