export default async function getDefaultSeverSide(): Promise<{resMenu: Response | null, resFooter: Response | null}>{
  const resMenu = await fetch(process.env.BE_URL + '/api/pages/menu').catch(
    (error) => {
      return null;
    },
  );
  const resFooter = await fetch(process.env.BE_URL + '/api/pages/footer').catch(
    (error) => {
      return null;
    },
  );
  return {resMenu, resFooter}
}