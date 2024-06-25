import React, { useEffect, useState } from "react";
// import { Box } from "@mui/material";
import Grid from "@mui/material/Grid";
import BarsDataset from "../components/HomeBarChart";
import { awsService } from "../services/Services";
import { azureService } from "../services/Services";
import { gcpService } from "../services/Services";
import CustomPieChart from "../components/CustomPieChart";
import { useContext } from "react";
import LoaderContext from "../context/LoaderContext";
export const Home = () => {
  const { loading, startLoading } = useContext(LoaderContext);

  const [data, setData] = useState({
    awsData: '',
    azureData: '',
    gcpData: ''
  });

  useEffect(() => {
    startLoading(true)
    forAwsGet();
  }, []);
  const forAwsGet = async () => {
    await awsService('', '', '', 1, 'Motivity Labs')
      .then((res) => {
        // console.log(res);
        setData((prev) => ({ ...prev, awsData: res }))
        // setawsData(res);
        startLoading(false)
      })
      .catch((error) => {
        console.log(error);
        startLoading(false)
      });
    await azureService('', '', '', 1, 'Microsoft Azure Motivity', 'Motivity Labs')
      .then((res) => {
        // console.log(res);
        setData((prev) => ({ ...prev, azureData: res }))
        // setazureData(res);
        startLoading(false)
      })
      .catch((error) => {
        console.log(error);
        startLoading(false)
      });
    await gcpService('', '', '', 1, 'My Maps Project')
      .then((res) => {
        // console.log(res);
        setData((prev) => ({ ...prev, gcpData: res }))
        // setgcpData(res);
        startLoading(false)
      })
      .catch((error) => {
        console.log(error);
        startLoading(false)
      });
  };
  console.log("awsData", data);


  const topAWSFiveCustomers = data?.awsData?.top5Services?.map((item) => {
    const { service, totalCost } = item;
    return {
      // name: `${service} - $${totalCost}`,
      name: `${service}`,
      value: totalCost,
      costType: 'Dollar'
    };
  });

  const topAzureFiveCustomers = data?.azureData?.top5Services?.map((item) => {
    const { resourceType, totalCost } = item;

    return {
      // name: `${service} - $${totalCost}`,
      name: `${resourceType}`,
      value: totalCost,
      costType: 'INR'

    };
  });


  const topGCPFiveCustomers = data?.gcpData?.top5Services?.map((item) => {
    const { serviceDescription, totalCost } = item;
    return {
      // name: `${serviceDescription} - $${totalCost}`,
      name: `${serviceDescription}`,
      value: totalCost && +totalCost?.toFixed(0),
      costType: 'Dollar'

    };
  });
  return (
    <>
      <Grid
        container
        spacing={3}
        style={{ marginLeft: "-10px", width: "100%" }}
        className="py-3"
      >
        {/* Barchart */}
        <Grid item xs={12} md={6} lg={8}>

          <div className="card p-3">
            <div className="fw-bold h5 mb-2">Billing Summary For This Month</div>
            {(data?.awsData?.monthlyTotalAmounts?.length > 0 || data?.azureData?.monthlyTotalAmounts?.length > 0 || data?.gcpData?.monthlyTotalAmounts?.length > 0) ? <BarsDataset
              data={data}
              height={403}
              barLineSize={60}
            /> : <div className="h6 d-flex flex-column align-items-center justify-content-center" style={{ height: '403px' }}>No Data Available</div>}
          </div>
        </Grid>

        {/* Totalamount */}
        <Grid
          item xs={12} md={6} lg={4}
          style={{
            padding: '24px 5px 0 20px',
          }}
        >
          <div className="card p-3">
            <div className="">
              <div className="h5 fw-bold" style={{ fontSize: '17px' }}>Top 5 AWS Consumers (Motivity Labs)</div>
              {data?.awsData?.top5Services && data?.awsData?.top5Services?.length > 0 ? <CustomPieChart
                data={data?.awsData?.top5Services && topAWSFiveCustomers}
                costType={data?.awsData?.currency}
                height={403}
              /> : <div className="h6 d-flex flex-column align-items-center justify-content-center" style={{ height: '403px' }}>No Data Available</div>}
            </div>
          </div>

        </Grid>

        <Grid
          item xs={12} md={6} lg={6}
          style={{
            padding: '24px 5px 0 20px',
          }}
        >
          <div className="card p-3">
            <div className="">
              <div className="h5 fw-bold" style={{ fontSize: '17px' }}>Top 5 Azure Consumers (Microsoft Azure Motivity)</div>
              {data?.azureData?.top5Services && data?.azureData?.top5Services?.length > 0 ? <CustomPieChart
                data={data?.azureData?.top5Services && topAzureFiveCustomers}
                costType={data?.azureData?.currency}
                height={320}
              /> : <div className="h6 d-flex flex-column align-items-center justify-content-center" style={{ height: '312px' }}>No Data Available</div>}
            </div>
          </div>

        </Grid>

        <Grid
          item xs={12} md={6} lg={6}
          style={{
            padding: '24px 5px 0 20px',
          }}
        >
          <div className="card p-3">
            <div className="">
              <div className="h5 fw-bold" style={{ fontSize: '17px' }}>Top 5 GCP Consumers (My Maps Project)</div>
              {data?.gcpData?.top5Services && data?.gcpData?.top5Services?.length > 0 ? <CustomPieChart
                data={data?.gcpData?.top5Services && topGCPFiveCustomers}
                costType={data?.gcpData?.currency}
                height={320}
              /> : <div className="h6 d-flex flex-column align-items-center justify-content-center" style={{ height: '312px' }}>No Data Available</div>}
            </div>
          </div>

        </Grid>
      </Grid>

    </>
  );
};

export default Home;
