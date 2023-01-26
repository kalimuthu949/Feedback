import * as React from "react";
import { IFeedBackProps } from "./IFeedBackProps";
import "../../../ExternalRef/css/style.css";
import MainFeedback from "./MainFeedback";
import { sp } from "@pnp/sp";

export default class FeedBack extends React.Component<IFeedBackProps, {}> {
  constructor(prop: IFeedBackProps, state: {}) {
    super(prop);
    sp.setup({
      spfxContext: this.props.context,
    });
  }

  public render(): React.ReactElement<IFeedBackProps> {
    return <MainFeedback context={this.props.context} sp={sp} />;
  }
}
