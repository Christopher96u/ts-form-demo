import { mobileFormOptions } from "../form-options";
import { withMobileForm } from "./form";
import { sectionCardClasses } from "./fields/styles";


const NewNumberSection = withMobileForm({
  ...mobileFormOptions({ simType: "ESIM" }),
  render: function Render({ form }) {
    return (
      <section className={`${sectionCardClasses} space-y-4`}>
        <header>
          <p className="text-sm font-semibold uppercase tracking-wide text-white/60">
            New mobile number
          </p>
          <p className="text-base text-white/80">
            Choose a fresh number from the available pool.
          </p>
        </header>
        <form.AppField name="newMobileNumber">
          {(field) => <field.NewMobileNumber />}
        </form.AppField>
      </section>
    );
  },
});

export { NewNumberSection };
