import React, { useEffect, useState } from "react";

export default function Kakao({
  latitude,
  longitude,
}: {
  latitude: string;
  longitude: string;
}) {
  const { kakao } = window;
  const [address, setAddress] = useState<any>("어디로 갈까요~");

  useEffect(() => {
    mapscript();
    getAddr(latitude, longitude);

    return setAddress("어디로 갈까요~");
  }, [latitude, longitude]);

  // 주소 구하기
  function getAddr(latitude: string, longitude: string) {
    let geocoder = new kakao.maps.services.Geocoder();

    let coord = new kakao.maps.LatLng(latitude, longitude);
    let callback = function (result: any, status: any) {
      if (status === kakao.maps.services.Status.OK) {
        setAddress(result[0].address.address_name);
      }
    };

    const result = geocoder.coord2Address(
      coord.getLng(),
      coord.getLat(),
      callback
    );

    return result;
  }

  // 지도 그리기
  const mapscript = () => {
    let container = document.getElementById("map");
    let options = {
      center: new kakao.maps.LatLng(latitude, longitude),
      level: 12,
    };
    //map
    const map = new kakao.maps.Map(container, options);

    //마커가 표시 될 위치
    let markerPosition = new kakao.maps.LatLng(latitude, longitude);

    // 마커를 생성
    let marker = new kakao.maps.Marker({
      position: markerPosition,
    });

    // 마커를 지도 위에 표시
    marker.setMap(map);
  };

  return (
    <div className="container_map">
      <div id="map" style={{ width: "1000px", height: "1000px" }}></div>
      <div className="box_address">{address}</div>
    </div>
  );
}
