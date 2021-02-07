import React, {useEffect, useState} from "react";
import './ST_Main_pages_wrapper.scss';
import {UI_nav_bar} from "./m1_components/a1_navbar/UI_nav_bar";
import {UI_logo_with_image} from "./m1_components/a2_logo_with_image/UI_logo_with_image";
import {UI_body_wrapper} from "./m1_components/a4_body_wrapper_router/UI_body_wrapper";
import {UI_footer} from "./m1_components/a5_footer/UI_footer";
import {useLocation} from 'react-router-dom';

// toast.error("toast test: ERROR");
// toast.success("toast test: SUCCEEDED");
// toast.info("toast test: INFO");
// toast.warn("toast test: WARNING");
import {ToastContainer, toast,} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {useAuth} from "./m1_components/c1_auth/a0_auth_common/firebase/AuthContext";
import {UI_PrivacyPolicy} from "./m1_components/z_privacy_policy/UI_PrivacyPolicy";


// custom hook: to add event window event listener once/render and remove on exit.
const useWindowSize = () => {
    const [size, setSize] = useState([window.innerHeight, window.innerWidth]);
    useEffect(() => {
        const handleWindowResize = () => {
            if (window.innerWidth >= 1440) {
                setSize([window.innerHeight, 1440]);
            } else {
                setSize([window.innerHeight, window.innerWidth]);
            }
        };
        window.addEventListener("resize", handleWindowResize);
        //clean up
        return () => {
            window.removeEventListener("resize", handleWindowResize);
        }
    }, []);
    return size;
}

//global show toast
export const showToast = (message, type) => {
    let errorColor;
    switch (type) {
        case "error":
            errorColor = "#ff6767";
            break;
        case "success":
            errorColor = "#1b6a34";
            break;
        case "info":
            errorColor = "#248C9D";
            break;
        default:
            errorColor = "#248C9D";
    }
    toast(message, {
        className: "good_toast",
        draggable: true,
        position: toast.POSITION.TOP_CENTER,
        style: {
            backgroundColor: errorColor
        },
        // progressClassName: 'progress_st',
        closeButton: false,
        type: "SUCCESS",
    });
}

export default function UI_Main_pages_wrapper() {
    const [shouldHideNavEtc, setShouldHideNavEtc] = useState(false);
    const location = useLocation();

    //should fire only when routing path changes:
    useEffect(() => {
        if (location.pathname === "/login" ||
            location.pathname === "/register" ||
            location.pathname === "/privacypolicy" ||
            location.pathname === "/forgot_password") {
            setShouldHideNavEtc(true);
        } else {
            setShouldHideNavEtc(false);
        }
    }, [location.pathname]);

    const {addUserDataToList} = useAuth(); ////////////////////temp
    const {currentUser} = useAuth();

    return (
        <div className={"main_wrapper"}
             style={shouldHideNavEtc ? {backgroundColor: "#24818d", transition: "2s"} : null}>
            {/*<button onClick={() => {*/}
            {/*    let userInfo = {*/}
            {/*        userName: currentUser.displayName,*/}
            {/*        userPhotoUrl: currentUser.photoURL,*/}
            {/*        userUid: currentUser.uid,*/}
            {/*        verified: currentUser.emailVerified*/}
            {/*    }*/}
            {/*    console.log("////:userInfo ", userInfo, "\n\n");*/}
            {/*    console.log("////:currentUser ", currentUser);*/}
            {/*}}>TEST*/}
            {/*</button>*/}
            <ToastContainer className={"pop"}/>
            {shouldHideNavEtc ? null : <UI_nav_bar/>}
            {shouldHideNavEtc ? null : <UI_logo_with_image/>}
            <div className={"page_content_wrapper"}>
                {/*<UI_divider/>*/}
                {shouldHideNavEtc ? ((location.pathname === "/privacypolicy") ?
                    <UI_body_wrapper wrapperHeight={"auto"}/> : <UI_body_wrapper wrapperHeight={"100vh"}/>) :
                    <UI_body_wrapper/>}
            </div>
            {shouldHideNavEtc ? null : <UI_footer/>}
        </div>
    );
}
