import React, {useEffect, useRef, useState} from "react";
import "./ST_Blog.scss";

import {VerticalTimeline, VerticalTimelineElement} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import events from "./timeline/events.json";
import {FaBriefcase} from "react-icons/fa";
import largeSL_logo from "../../a2_logo_with_image/sl_logo_big.svg";
import {TextEditorWYSIWYG} from "../../a0_shared_all/wysiwyg/TextEditorWYSIWYG";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import {RiEditFill} from "react-icons/ri";
import {IconContext} from "react-icons";
import {FaShare} from "react-icons/fa";
import {AiFillPicture} from "react-icons/ai";
import {ContentState, convertToRaw, EditorState} from "draft-js";
import draftToHtml from "draftjs-to-html";
import {useTranslation} from "react-i18next";
import {Editor} from "react-draft-wysiwyg";
import htmlToDraft from "html-to-draftjs";


let blogDefaultTextE = `
<p>Share your inspirational blog with us!</p>
<p></p>
<p></p>
 
 
`;

let blogDefaultTextN = `
<p>Del din inspirasjonsblogg med oss!</p>
<p></p>
<p></p>
 
 
`;


export const UI_Blog = () => {
    let shouldPrompt = false;
    const {t, i18n} = useTranslation("SL_languages");
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const [rawAndHtmlForm, setRawAndHtmlForm] = useState([]);
    // const [hideEditor, setHideEditor] = useState(true);


    useEffect(() => {
        let contentBlockBlog;
        if (i18n.language === "en") {
            contentBlockBlog = htmlToDraft(blogDefaultTextE);
        } else {
            contentBlockBlog = htmlToDraft(blogDefaultTextN);
        }
        if (contentBlockBlog) {
            const contentState = ContentState.createFromBlockArray(
                contentBlockBlog.contentBlocks
            );
            const editorState = EditorState.createWithContent(contentState);
            setEditorState(editorState);
        }
    }, [t]);



    const images = [
        {
            original: 'https://picsum.photos/id/1018/1000/600/',
            thumbnail: 'https://picsum.photos/id/1018/250/150/',
        },
        {
            original: 'https://picsum.photos/id/1015/1000/600/',
            thumbnail: 'https://picsum.photos/id/1015/250/150/',
        },
        {
            original: 'https://picsum.photos/id/1019/1000/600/',
            thumbnail: 'https://picsum.photos/id/1019/250/150/',
        },
    ];

    const handleTimeelementClick = (e) => {
        console.log("////:OnCl ", e);
    };

    // const handleShowEditor = () =>{
    //   setHideEditor(false);
    // };

    const postBlog = () => {
        let raw = convertToRaw(editorState.getCurrentContent());
        let htmlTxt = draftToHtml(convertToRaw(editorState.getCurrentContent()));

        setRawAndHtmlForm([raw, htmlTxt]);
        console.log("////:RAW: ", raw);
        console.log("////:htmlTxt: ", htmlTxt);
    };

    const addImage = () =>{
      console.log("////: upload image: show image list div?");
    };

    return (
        <div className={"timeLineMainWrapper"}>
            <div className={"large_sl_logo_container_blog"}>
                <img className={"large_logo_image_blog"} src={largeSL_logo} alt={"SILVERLINING logo large"}/>
            </div>
            {/*/////////blog editor///////////*/}
            <div className={"editorWrapper"}>
                <div className={"editorInnerWrapper"}><Editor
                    editorStyle={{backgroundColor: "#fdfdfd"}}
                    toolbarClassName="mainToolBarWrapper"
                    wrapperClassName="toolWrapper"
                    editorClassName="editor"
                    size="normal"
                    toolbar={{
                        options: ["inline", "textAlign", "blockType", "fontSize", "fontFamily", "list", "link", "colorPicker", "history", "emoji"],
                        // image: { uploadCallback: uploadImageCallBack, alt: { present: true, mandatory: true } },
                        link: {inDropdown: false},
                        list: {inDropdown: false}
                    }}
                    editorState={editorState}
                    onEditorStateChange={(es) => {
                        setEditorState(es);
                        try {
                            let editedToHtml = JSON.stringify(draftToHtml(convertToRaw(editorState.getCurrentContent())));
                            localStorage.setItem("blogEdit", editedToHtml);
                        } catch (e) {
                            console.log("////: Error saving to ls! ", e);
                            shouldPrompt = true;
                        }
                        // props.setFormData(es);
                    }}/>
                    <div className={"blogEditorFooter"}>
                        <div>
                            <button style={{width: "200px"}} onClick={() => {
                                postBlog();
                            }} type="button" className="btn btn-dark mx-1 my-3">
                                <IconContext.Provider value={{size: "1.5em"}}>
                                    <FaShare style={{color: "#248C9D", marginRight: "10px"}}/>
                                </IconContext.Provider>
                                {t("blog.postBtn")}
                            </button>
                            <button style={{width: "200px"}} onClick={() => {
                                addImage();
                            }} type="button" className="btn btn-dark mx-3 my-3">
                                <IconContext.Provider value={{size: "1.5em"}}>
                                    <AiFillPicture style={{color: "#248C9D", marginRight: "10px"}}/>
                                </IconContext.Provider>
                                {t("blog.addImage")}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {/*//////////blog editor//////////*/}
            <VerticalTimeline className={"verticalTl"}>
                {events.map(event => (
                    <VerticalTimelineElement
                        onTimelineElementClick={(e) => {
                            handleTimeelementClick(e);
                        }}
                        className="vertical-timeline-element--work"
                        iconStyle={{
                            background: "rgb(33, 150, 143)",
                            color: "#fff",
                            overflow: "hidden",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center"
                            // boxShadow: "0 0 0 4px #248C9D",
                        }}

                        contentArrowStyle={{borderRight: "7px solid  #d3412a"}}
                        date="2011 - present"
                        icon={<img
                            alt=""
                            className="blogImg"
                            src="https://images.pexels.com/photos/104827/cat-pet-animal-domestic-104827.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"/>}>
                        <div className={"blogReadMoreText"}>
                            <h3 className="vertical-timeline-element-title">Creative
                                Director</h3>
                            <h4 className="vertical-timeline-element-subtitle">Miami, FL</h4>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores corporis impedit
                                nobis
                                omnis quam quasi vitae, voluptatem? Ad architecto doloremque earum est excepturi facere
                                fugiat fugit in ipsa ipsum nobis obcaecati quia quod rem repellendus tempore, tenetur
                                ullam
                                ut veniam voluptatem. Ab ducimus quaerat rem. Harum incidunt numquam possimus. Debitis.
                            </p></div>
                        <div className={"blogListFooterEmbedWrapper"}>
                            <ImageGallery
                                items={images}
                                showPlayButton={false}
                                showNav={false}
                            />
                        </div>
                    </VerticalTimelineElement>
                ))}
            </VerticalTimeline>
        </div>

    );
};