import * as React from "react";
import styles from "./FeedBack.module.scss";
import { CircularProgress } from "@material-ui/core";
import { TextField, Label, ITextFieldStyles, Spinner } from "@fluentui/react";
import { useState, useEffect } from "react";

interface IFeedBack {
  Title: string;
  Feedback: string;
}

const MainFeedback = (props: any) => {
  /* Variable-decluration section start */
  let feedBackObj: IFeedBack = {
    Title: "",
    Feedback: "",
  };

  let errFeedback: IFeedBack = {
    Title: "",
    Feedback: "",
  };
  /* Variable-decluration section end */

  /* State-decluration section start */
  const [masterFeedBack, setMasterFeedBack] = useState<IFeedBack>(feedBackObj);
  const [errorFeedBack, setErrorFeedBack] = useState<IFeedBack>(errFeedback);
  const [successmsg, setsuccessmsg] = useState("");
  const [isLoader, setIsLoader] = useState<boolean>(false);
  const [isSpinner, setIsSpinner] = useState<boolean>(false);
  /* State-decluration section end */

  /* Style section start */
  const longTextBoxStyles: Partial<ITextFieldStyles> = {
    root: { width: "100%", margin: "5px 0px" },
    fieldGroup: {
      height: 80,
      border: "1px solid #00584d",
      borderRadius: "3px",
      ":after": { border: "1px solid #00584d" },
    },
    field: { fontSize: 14 },
  };

  const textBoxStyles: Partial<ITextFieldStyles> = {
    root: {
      width: "100%",
      margin: "5px 10px 0px 0px",
    },
    fieldGroup: {
      border: "1px solid #00584d",
      borderRadius: "3px",
      ":after": { border: "1px solid #00584d" },
    },
    field: {
      fontSize: 14,
    },
  };

  const textBoxErrorStyles: Partial<ITextFieldStyles> = {
    root: { width: "100%", margin: "5px 10px 0px 0px" },
    fieldGroup: {
      border: "2px solid #f00",
      ":hover": { border: "2px solid #f00" },
      ":after": { border: "2px solid #f00" },
    },
    field: { fontSize: 14 },
  };
  /* Style section end */

  /* Function section start */
  // get error function section
  const getErrorFunction = (error: any) => {
    console.log(error);
  };
  // validation function section
  const getvalidation = () => {
    let errValidation: IFeedBack = {
      Title: "",
      Feedback: "",
    };
    if (!masterFeedBack.Title) {
      errValidation.Title = "Please enter your name";
      setErrorFeedBack({ ...errValidation });
      setIsSpinner(false);
    } 
    else if (!masterFeedBack.Feedback) {
      errValidation.Feedback = "Please enter your feedback";
      setErrorFeedBack({ ...errValidation });
      setIsSpinner(false);
    } else {
      setErrorFeedBack({ ...errValidation });
      addRecord();
    }
  };

  // get record add function section
  const addRecord = async () => {
    await props.sp.web.lists
      .getByTitle("Host Hub Feedback")
      // .getByTitle("Feedback")
      .items.add(masterFeedBack)
      .then((response: any) => {
        setMasterFeedBack({
          Title: "",
          Feedback: "",
        });
        setIsSpinner(false);
        setsuccessmsg("Your feedback submitted successfully !!!");
        setTimeout(() => {
          setsuccessmsg("");
        }, 2000);
      })
      .catch((error: any) => {
        getErrorFunction(error);
      });
  };

  // useEffect function section
  useEffect(() => {
    setIsLoader(false);
    props.sp.web.currentUser.get().then((res) => 
    {
      //masterFeedBack.Title = res.Title;
      //setMasterFeedBack({ ...masterFeedBack });
    });
  }, []);
  /* Function section end */

  return (
    <>
      {isLoader ? (
        <>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100vh",
            }}
          >
            <CircularProgress style={{ color: "blue" }} />
          </div>
        </>
      ) : (
        <>
          {/* Feedback section start */}
          <div className={styles.FeedBackBodySection}>
            {/* Lable section */}
            <div className={styles.Header}>Host Hub Feedback</div>

            {/* Feedback Text Field section start */}
            <div>
              <div style={{ marginTop: 12 }}>
                <Label required className={styles.LabelSection}>
                  1. Your Name
                </Label>
                <TextField
                  styles={
                    errorFeedBack.Title ? textBoxErrorStyles : textBoxStyles
                  }
                  placeholder="Enter your answer"
                  value={masterFeedBack.Title}
                  onChange={(e: any, value: string) => {
                    masterFeedBack.Title = value;
                    setMasterFeedBack({ ...masterFeedBack });
                  }}
                />
              </div>
              <div style={{ marginTop: 12 }}>
                <Label required className={styles.LabelSection}>
                  2. Description
                </Label>
                <TextField
                  styles={
                    errorFeedBack.Feedback
                      ? textBoxErrorStyles
                      : longTextBoxStyles
                  }
                  placeholder="Enter your answer"
                  multiline
                  value={masterFeedBack.Feedback}
                  onChange={(e: any, value: string) => {
                    masterFeedBack.Feedback = value;
                    setMasterFeedBack({ ...masterFeedBack });
                  }}
                />
              </div>
            </div>
            {/* Feedback Text Field section end */}

            {/* BTN section start */}
            <div>
              <div style={{ color: "red", fontWeight: "600" }}>
                {errorFeedBack.Title ? `* ${errorFeedBack.Title}` : ""}
                {errorFeedBack.Feedback ? `* ${errorFeedBack.Feedback}` : ""}
              </div>
              <div style={{ color: "Green", fontWeight: "600" }}>
                {successmsg}
              </div>
              <div className={styles.btnContainer}>
                <button
                  disabled={isSpinner}
                  className={styles.btnSection}
                  onClick={() => (setIsSpinner(true), getvalidation())}
                >
                  {isSpinner ? <Spinner /> : "SUBMIT"}
                </button>
              </div>
            </div>
            {/* BTN section end */}
          </div>
          {/* Feedback section end */}
        </>
      )}
    </>
  );
};

export default MainFeedback;
