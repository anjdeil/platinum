import { StyledIconButton } from '@/styles/components';
import { IconButtonProps } from '@/types/layouts/Buttons';
import Badge from '../../Badge/Badge';

export default function CartButton({ count = 0, color = "#fff" }: IconButtonProps) {  
  return (
    <StyledIconButton>
      <Badge count={count} />
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M2 2H3.96495C4.84275 2 5.28165 2 5.61209 2.22909C5.94252 2.45818 6.08125 2.85818 6.35872 3.65818L7.04481 5.63636" stroke={color} stroke-linecap="round"/>
        <path d="M19.6568 17.7575H7.73842C7.55554 17.7575 7.46347 17.7575 7.39285 17.7502C7.21773 17.7314 7.04865 17.6776 6.89651 17.5922C6.74437 17.5067 6.61254 17.3916 6.50952 17.2542C6.4065 17.1169 6.33457 16.9602 6.29838 16.7945C6.26218 16.6288 6.26253 16.4576 6.29938 16.292C6.3285 16.1847 6.36258 16.0788 6.40154 15.9744C6.46712 15.7878 6.49865 15.6944 6.53523 15.6108C6.71476 15.1975 7.0099 14.8401 7.38791 14.5782C7.76593 14.3163 8.21203 14.1602 8.67675 14.1272C8.77008 14.1211 8.87224 14.1211 9.07655 14.1211H15.8732" stroke={color} stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M15.4682 14.1216H11.6329C10.0185 14.1216 9.21137 14.1216 8.58077 13.7216C7.94891 13.3216 7.63108 12.6088 6.99544 11.1834L6.78229 10.7058C5.76072 8.4149 5.25119 7.27187 5.81117 6.45369C6.37366 5.63672 7.67018 5.63672 10.2607 5.63672H16.9198C19.8206 5.63672 21.2697 5.63672 21.8171 6.54217C22.3632 7.44763 21.6443 8.65732 20.2053 11.0767L19.8484 11.6791C19.1396 12.8707 18.7852 13.467 18.1974 13.7943C17.611 14.1216 16.8959 14.1216 15.4682 14.1216Z" stroke={color} stroke-linecap="round"/>
        <path d="M19.0268 22.0004C19.7234 22.0004 20.288 21.4577 20.288 20.7883C20.288 20.1189 19.7234 19.5762 19.0268 19.5762C18.3303 19.5762 17.7656 20.1189 17.7656 20.7883C17.7656 21.4577 18.3303 22.0004 19.0268 22.0004Z" fill={color}/>
        <path d="M8.93698 22.0004C9.63353 22.0004 10.1982 21.4577 10.1982 20.7883C10.1982 20.1189 9.63353 19.5762 8.93698 19.5762C8.24044 19.5762 7.67578 20.1189 7.67578 20.7883C7.67578 21.4577 8.24044 22.0004 8.93698 22.0004Z" fill={color}/>
      </svg>
    </StyledIconButton>
  );
}