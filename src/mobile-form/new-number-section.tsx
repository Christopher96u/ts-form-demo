import { mobileFormOptions } from "../form-options";
import { withMobileForm } from "./form";


const NewNumberSection = withMobileForm({
  ...mobileFormOptions({ simType: "ESIM" }),
  render: function Render({ form }) {
    return (
      <section>
        <form.AppField name="newMobileNumber">
          {(field) => <field.NewMobileNumber />}
        </form.AppField>
      </section>
    );
  },
});

export { NewNumberSection };