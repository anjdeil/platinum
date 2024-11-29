import { SplitSectionData } from '@/types/components/sections/index';

type SplitSectionProps = Omit<SplitSectionData, '_type'>;

export const SplitSection: React.FC<SplitSectionProps> = ({ split }) => {
  return (
    <div>
      <h2>SplitSection</h2>
      {split.map((section, index) => {
        return (
          <div key={index}>
            {section.sections.map((innerSection, innerIndex) => {
              return (
                <div key={innerIndex}>
                  <h3>{innerSection._type}</h3>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

// "split": [
//   {
//     "_type": "inner_section",
//     "sections": [
//       {
//         "_type": "rich_text",
//         "text": "\u003Ch3\u003EInPost courier\u003C/h3\u003E\u003Cbr/\u003E\u003Cul\u003E\u003Cbr/\u003E\u003Cli\u003EDelivery time is on average 2-3 days\u003C/li\u003E\u003Cbr/\u003E\u003Cli\u003EDelivery cost PLN 17\u003C/li\u003E\u003Cbr/\u003E\u003Cli\u003EFREE delivery in Poland from PLN 200 \u003C/li\u003E\u003Cbr/\u003E\u003C/ul\u003E"
//       }
//     ]
//   },
//   {
//     "_type": "inner_section",
//     "sections": [
//       {
//         "_type": "rich_text",
//         "text": "\u003Ch3\u003EInPost parcel lockers\u003C/h3\u003E\u003Cbr/\u003E\u003Cul\u003E\u003Cbr/\u003E\u003Cli\u003EDelivery time is 2-3 days\u003C/li\u003E\u003Cbr/\u003E\u003Cli\u003EDelivery cost PLN 13\u003C/li\u003E\u003Cbr/\u003E\u003Cli\u003ESelect a pickup point\u003C/li\u003E\u003Cbr/\u003E\u003C/ul\u003E"
//       }
//     ]
//   },
//   {
//     "_type": "inner_section",
//     "sections": [
//       {
//         "_type": "rich_text",
//         "text": "\u003Ch3\u003EInPost courier cash on delivery\u003C/h3\u003E\u003Cbr/\u003E\u003Cul\u003E\u003Cbr/\u003E\u003Cli\u003EDelivery time is 2-3 days\u003C/li\u003E\u003Cbr/\u003E\u003Cli\u003EDelivery cost PLN 21\u003C/li\u003E\u003Cbr/\u003E\u003C/ul\u003E"
//       }
//     ]
//   }
// ]
