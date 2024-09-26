import CustomAccordion from "@/components/shared/Accordion/Accordion";
import { CustomBox } from './styles'

export const Benefits = () => {
    return (
        <CustomBox>
            <CustomAccordion
                title="Benefits"
                children={
                    <ul>
                        <li>Benefit 1</li>
                        <li>Benefit 2</li>
                    </ul>
                }
                panel="panel1"
            />

            <CustomAccordion
                title="Benefits"
                children={
                    <ul>
                        <li>Benefit 1</li>
                        <li>Benefit 2</li>
                    </ul>
                }
                panel="panel1"
            />

            <CustomAccordion
                title="Benefits"
                children={
                    <ul>
                        <li>Benefit 1</li>
                        <li>Benefit 2</li>
                    </ul>
                }
                panel="panel1"
            />
        </CustomBox>
    )
}