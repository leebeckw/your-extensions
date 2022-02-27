import { React } from "jimu-core";
import { AllWidgetSettingProps } from "jimu-for-builder";
import {
  MapWidgetSelector,
  SettingRow,
  SettingSection,
} from "jimu-ui/advanced/setting-components";
import defaultI18nMessages from "./translations/default";
import { IMConfig } from "../config";

interface IState {
  instructTextareaValue: string;
  layerTextareaValue: string;
}

export default class Setting extends React.PureComponent<
  AllWidgetSettingProps<IMConfig>,
  IState
> {
  constructor(props) {
    super(props);

    console.log(
      "TYPEOF undefined",
      typeof this.props.config?.instructText === undefined,
      typeof this.props.config?.layerUrls === undefined,
      typeof this.props.config?.textChange === undefined,
    );

    this.state = {
      instructTextareaValue:
        this.props.config?.instructText === undefined
          ? ""
          : this.props.config?.instructText.join("\n"),
      layerTextareaValue:
        this.props.config?.layerUrls === undefined
          ? ""
          : this.props.config?.layerUrls.join("\n"),
    };
  }

  onMapSelected = (useMapWidgetIds: string[]) => {
    this.props.onSettingChange({
      id: this.props.id,
      useMapWidgetIds: useMapWidgetIds,
    });
  };

  onInstructTextChange = (event) => {
    this.setState({ instructTextareaValue: event.target.value });

    this.props.onSettingChange({
      id: this.props.id,
      config: this.props.config.set(
        "instructText",
        event.target.value.split("\n"),
      ),
    });

    // this.props.onSettingChange({
    //   id: this.props.id,
    //   config: this.props.config.set(
    //     "textChange",
    //     true,
    //   ),
    // });
  };

  onLayerTextChange = (event) => {
    this.setState({ layerTextareaValue: event.target.value });

    this.props.onSettingChange({
      id: this.props.id,
      config: this.props.config.set(
        "layerUrls",
        event.target.value.split("\n")
      ),
    });
  };

  render() {
    return (
      <div className="input-instructions-in-text">
        <SettingSection
          title={this.props.intl.formatMessage({
            id: "selectedMapLabel",
            defaultMessage: defaultI18nMessages.selectedMap,
          })}
        >
          <SettingRow>
            <MapWidgetSelector
              onSelect={this.onMapSelected}
              useMapWidgetIds={this.props.useMapWidgetIds}
            />
          </SettingRow>
        </SettingSection>

        <SettingSection
          title={this.props.intl.formatMessage({
            id: "instructions",
            defaultMessage: defaultI18nMessages.instructions,
          })}
        >
          <SettingRow>
            <textarea
              className="w-100 p-1"
              style={{ whiteSpace: "nowrap", minHeight: "100px" }}
              value={this.state.instructTextareaValue}
              onChange={this.onInstructTextChange}
            ></textarea>
          </SettingRow>
        </SettingSection>

        <SettingSection
          title={this.props.intl.formatMessage({
            id: "toAdd",
            defaultMessage: defaultI18nMessages.toAdd,
          })}
        >
          <SettingRow>
            <textarea
              className="w-100 p-1"
              style={{ whiteSpace: "nowrap", minHeight: "100px" }}
              value={this.state.layerTextareaValue}
              onChange={this.onLayerTextChange}
            ></textarea>
          </SettingRow>
        </SettingSection>
      </div>
    );
  }
}