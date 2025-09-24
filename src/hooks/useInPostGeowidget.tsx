import InPostGeowidget from '@/components/widgets/InPostGeowidget';
import { InPostPointDetail, onPointSelectEvent } from '@/types/components/widgets/inPostGeowidget';
import { useEffect, useState } from 'react';

export default function useInPostGeowidget() {
  const [pointDetail, setPointDetail] = useState<InPostPointDetail>();

  useEffect(() => {
    const handlePointSelect = (event: Event): void => {
      const onPointSelectEvent = event as onPointSelectEvent;

      const pointDetail = onPointSelectEvent?.detail;
      if (!pointDetail) return;

      setPointDetail(pointDetail);
    };

    document.addEventListener('onpointselect', handlePointSelect);
    return () => document.removeEventListener('onpointselect', handlePointSelect);
  }, []);

  return {
    inPostHead:
      <>
        <link rel="stylesheet" href="https://geowidget.inpost.pl/inpost-geowidget.css" />
        <script async src="https://geowidget.inpost.pl/inpost-geowidget.js" defer></script>
      </>,
    InPostGeowidget,
    pointDetail,
  };
}