package br.unipar.MedialApi.service;

import br.unipar.MedialApi.model.EsquadriaObra;
import br.unipar.MedialApi.model.Obra;
import br.unipar.MedialApi.model.dto.EsquadriaObraAgrupadaDto;
import br.unipar.MedialApi.model.enumModel.CorEnum;
import br.unipar.MedialApi.model.enumModel.OrderByEnum;
import br.unipar.MedialApi.repository.EsquadriaObraRepository;
import br.unipar.MedialApi.specification.EsquadriaObraSpecification;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.BigInteger;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class EsquadriaObraService {
    @Autowired
    private EsquadriaObraRepository esquadriaObraRepository;

    @Autowired
    private ObraService obraService;

    public List<EsquadriaObra> findAll (Long idObra, Long idEsquadria){
        return findAll(idObra, idEsquadria, OrderByEnum.DESC);
    }

    public List<EsquadriaObra> findAll (Long idObra, Long idEsquadria, OrderByEnum orderBy){
        Specification<EsquadriaObra> spec = Specification.where(null);

        if(idObra != null && idObra != 0){
            spec = spec.and(EsquadriaObraSpecification.pertenceAObra(idObra));
        }
        if(idEsquadria != null && idEsquadria != 0){
            spec = spec.and(EsquadriaObraSpecification.pertenceAEsquadria(idEsquadria));
        }
        spec = spec.and(EsquadriaObraSpecification.ativo());

        List<EsquadriaObra> esquadriaObras;

        if(orderBy != null && orderBy.equals(OrderByEnum.ASC)){
            esquadriaObras = esquadriaObraRepository.findAll(spec, Sort.by("idEsquadriaObra").ascending());
        }else{//por padrao a ordenação das esquadrias de obras devem ser DESC
            esquadriaObras = esquadriaObraRepository.findAll(spec, Sort.by("idEsquadriaObra").descending());
        }

        return esquadriaObras;

    }

    public EsquadriaObra insert (EsquadriaObra esquadriaObra) throws Exception{
        validaInsert(esquadriaObra);
        Obra obra = obraService.findById(esquadriaObra.getObra().getIdObra());
        if(!obra.isStImpresso()){
            esquadriaObra.setStAtivo(true);
            esquadriaObra.setNrVersaobra(obra.getNrVersao());
            return esquadriaObraRepository.saveAndFlush(esquadriaObra);
        }else{
            return insereEsquadriaEmObraImpressa(esquadriaObra);
        }
    }
    private EsquadriaObra insereEsquadriaEmObraImpressa(EsquadriaObra esquadriaObra) throws Exception{
        Obra obra = obraService.findById(esquadriaObra.getObra().getIdObra());
        int vNrVersao = obra.getNrVersao() + 1;

        //atualiza a versao da obra
        esquadriaObra.getObra().setNrVersao(vNrVersao);
        obraService.updateVersao(esquadriaObra.getObra());

        List<EsquadriaObra> esquadrias = findAll(esquadriaObra.getObra().getIdObra(), null, OrderByEnum.ASC);

        for (EsquadriaObra eo: esquadrias) {
            //insere a copia da esquadria obra
            EsquadriaObra esquadriaatualizada = new EsquadriaObra();
            esquadriaatualizada.setCdEsquadriaObra(eo.getCdEsquadriaObra());
            esquadriaatualizada.setDsCor(eo.getDsCor());
            esquadriaatualizada.setTmAltura(eo.getTmAltura());
            esquadriaatualizada.setTmLargura(eo.getTmLargura());
            esquadriaatualizada.setEsquadria(eo.getEsquadria());
            esquadriaatualizada.setObra(eo.getObra());
            esquadriaatualizada.setStAtivo(true);
            esquadriaatualizada.setNrVersaobra(vNrVersao);
            esquadriaObraRepository.saveAndFlush(esquadriaatualizada);

            //desabilita a esquadriaObra anterior para manter versionamento da obra
            eo.setStAtivo(false);
            esquadriaObraRepository.saveAndFlush(eo);
        }
        //insere a nova esqaudriaObra
        esquadriaObra.setStAtivo(true);
        esquadriaObra.setNrVersaobra(vNrVersao);
        return esquadriaObraRepository.saveAndFlush(esquadriaObra);
    }

    public EsquadriaObra delete (Long idEsquadriaObra) throws Exception{
        EsquadriaObra esquadriaObra = findById(idEsquadriaObra);

        Obra obra = obraService.findById(esquadriaObra.getObra().getIdObra());
        if(!obra.isStImpresso()){
            esquadriaObra.setStAtivo(false);
            return esquadriaObraRepository.saveAndFlush(esquadriaObra);
        }else{
            return excluiEsquadriaEmObraImpressa(esquadriaObra);
        }
    }

    private EsquadriaObra excluiEsquadriaEmObraImpressa(EsquadriaObra esquadriaObra) throws Exception {
        Obra obra = obraService.findById(esquadriaObra.getObra().getIdObra());
        int vNrVersao = obra.getNrVersao() + 1;

        //atualiza a versao da obra
        esquadriaObra.getObra().setNrVersao(vNrVersao);
        obraService.updateVersao(esquadriaObra.getObra());

        List<EsquadriaObra> esquadrias = findAll(esquadriaObra.getObra().getIdObra(), null, OrderByEnum.ASC);

        for (EsquadriaObra eo: esquadrias) {
            /* insere a copia da esquadria obra
             * -Como é um delete precisa inserir na nova versao da esquadria obra apenas os registros que o usuario NAO apagou*/
            if(!eo.getIdEsquadriaObra().equals(esquadriaObra.getIdEsquadriaObra())){
                EsquadriaObra esquadriaatualizada = new EsquadriaObra();
                esquadriaatualizada.setCdEsquadriaObra(eo.getCdEsquadriaObra());
                esquadriaatualizada.setDsCor(eo.getDsCor());
                esquadriaatualizada.setTmAltura(eo.getTmAltura());
                esquadriaatualizada.setTmLargura(eo.getTmLargura());
                esquadriaatualizada.setEsquadria(eo.getEsquadria());
                esquadriaatualizada.setObra(eo.getObra());
                esquadriaatualizada.setStAtivo(true);
                esquadriaatualizada.setNrVersaobra(vNrVersao);
                esquadriaObraRepository.saveAndFlush(esquadriaatualizada);
            }

            //desabilita a esquadriaObra anterior para manter versionamento da obra
            eo.setStAtivo(false);
            esquadriaObraRepository.saveAndFlush(eo);
        }
        esquadriaObra.setNrVersaobra(vNrVersao);
        return esquadriaObra;
    }

    public EsquadriaObra findById(Long id) throws Exception{
        Optional<EsquadriaObra> retorno = esquadriaObraRepository.findById(id);
        if(retorno.isPresent()){
            return retorno.get();
        }else{
            throw new Exception("Vinculo com o ID ("+id+") não encontrado");
        }
    }

    public EsquadriaObra update(EsquadriaObra esquadriaObra) throws Exception{
        Obra obra = obraService.findById(esquadriaObra.getObra().getIdObra());
        if(!obra.isStImpresso()){
            validaUpdate(esquadriaObra);
            return esquadriaObraRepository.saveAndFlush(esquadriaObra);
        }else{
            return atualizaEsquadriaEmObraImpressa(esquadriaObra);
        }
    }

    private EsquadriaObra atualizaEsquadriaEmObraImpressa(EsquadriaObra esquadriaObra) throws Exception{
        Obra obra = obraService.findById(esquadriaObra.getObra().getIdObra());
        int vNrVersao = obra.getNrVersao() + 1;

        //atualiza a versao da obra
        esquadriaObra.getObra().setNrVersao(vNrVersao);
        obraService.updateVersao(esquadriaObra.getObra());

        List<EsquadriaObra> esquadrias = findAll(esquadriaObra.getObra().getIdObra(), null, OrderByEnum.ASC);

        for (EsquadriaObra eo: esquadrias) {
            /* insere a copia da esquadria obra
             * -Como é um update precisa verificar o Id para nao deixar o registro duplicado na nova versao da obra*/
            if(!eo.getIdEsquadriaObra().equals(esquadriaObra.getIdEsquadriaObra())){
                EsquadriaObra esquadriaatualizada = new EsquadriaObra();
                esquadriaatualizada.setCdEsquadriaObra(eo.getCdEsquadriaObra());
                esquadriaatualizada.setDsCor(eo.getDsCor());
                esquadriaatualizada.setTmAltura(eo.getTmAltura());
                esquadriaatualizada.setTmLargura(eo.getTmLargura());
                esquadriaatualizada.setEsquadria(eo.getEsquadria());
                esquadriaatualizada.setObra(eo.getObra());
                esquadriaatualizada.setStAtivo(true);
                esquadriaatualizada.setNrVersaobra(vNrVersao);
                esquadriaObraRepository.saveAndFlush(esquadriaatualizada);
            }else{
                //passa a PK para null para o Spring criar uma nova entidade no bd
                esquadriaObra.setIdEsquadriaObra(null);
                esquadriaObra.setNrVersaobra(vNrVersao);
                validaUpdate(esquadriaObra);
                esquadriaObra = esquadriaObraRepository.saveAndFlush(esquadriaObra);
            }

            //desabilita a esquadriaObra anterior para manter versionamento da obra
            eo.setStAtivo(false);
            esquadriaObraRepository.saveAndFlush(eo);
        }
        return esquadriaObra;
    }

    public List<CorEnum> getCotes() {
        return List.of(CorEnum.values());
    }

    private void validaInsert(EsquadriaObra esquadriaObra) throws Exception{
        validaFks(esquadriaObra);
        validaDefault(esquadriaObra);
    }
    private void validaFks(EsquadriaObra esquadriaObra)throws Exception{
        if(esquadriaObra.getObra() == null || esquadriaObra.getObra().getIdObra() == 0){
            throw new Exception("Informe a Obra para realizar o vinculo.");
        }
        if(esquadriaObra.getEsquadria() == null || esquadriaObra.getEsquadria().getIdEsquadria() == 0){
            throw new Exception("Informe a esquadria para realizar o vinculo com a obra.");
        }
    }
    private void validaDefault(EsquadriaObra esquadriaObra)throws Exception{

        esquadriaObra.setCdEsquadriaObra(esquadriaObra.getCdEsquadriaObra().trim().replaceAll("\\s+", " "));
        /* COMENTATO PORQUE NAO É OBRIGATORIO
        if(esquadriaObra.getCdEsquadriaObra() == null || esquadriaObra.getCdEsquadriaObra().isEmpty()){
            throw new Exception("Informe o código da esquadria.");
        }*/
        if(esquadriaObra.getCdEsquadriaObra().trim().length() > 5){
            throw new Exception("O código da esquadria deve conter no máximo 5 caracteres.");
        }
        if(esquadriaObra.getTmAltura() == null || esquadriaObra.getTmAltura().compareTo(new BigDecimal(0)) <= 0){
            throw new Exception("Altura inválida, verifique!");
        }
        if(esquadriaObra.getTmLargura() == null || esquadriaObra.getTmLargura().compareTo(new BigDecimal(0)) <= 0){
            throw new Exception("Largura inválida, verifique!");
        }
        if(esquadriaObra.getDsCor() == null || esquadriaObra.getDsCor().equals(CorEnum.VAZIO) || esquadriaObra.getDsCor().toString().isEmpty()){
            throw new Exception("Informe a cor da esquadria.");
        }
    }
    private void validaUpdate(EsquadriaObra esquadriaObra) throws Exception{
        validaFks(esquadriaObra);
        validaDefault(esquadriaObra);
    }

    public String retornaProximoCodigoEsquadria(String value){
        if(value.isEmpty()){
            return value;
        }
        char[] caracteres = value.toCharArray();
        boolean finalizou = false;

        for(int i = caracteres.length-1; i >= 0 ; i--){
            caracteres[i] = inc(caracteres[i]);
            if(caracteres[i] != '0' && !String.valueOf(caracteres[i]).equalsIgnoreCase("A")){
                finalizou = true;
                break;
            }
        }

        //comeca a preparar o retorno
        String retorno = new String(caracteres);

        if(finalizou){
            //se finalizou o loop como esperamos ja retorna o valor
            if(retorno.equals(value)){
                /*se o valor for o mesmo retorna vazio, por que as vezes o ususario pode colcoar um caracter especial no meio do codigo*/
                return "";
            }
            return retorno;
        }else if(!finalizou && caracteres.length < 5){
            //se nao finalizou o loop antes de seu fim e a entrada é menor que 5 caracteres incrementa um numero/letra automaticamente
            try{
                int testaInt = Integer.parseInt(retorno);
                retorno = "1" + retorno;
            }catch(Exception e){
                retorno =  "A" + retorno;
            }
            return retorno;
        }else{
            //retorna vazio caso nao finalizou e ja esta com 5 caracteres
            return "";
        }
    }

    private char inc(char value){
        /*Função para incrementar o proximo caractere*/
        int  valueInt;
        String  valueString;
        try{
            valueInt = Integer.parseInt(String.valueOf(value)) + 1; //se for number adiciona +1 no valor
            valueString = Integer.toString(valueInt); //converte para string para simplifcar o retorno
            return valueString.charAt(valueString.length()-1); //volta o ultimo valor porque o valor de input pode ser 9, que totalizaria 10 na variavel valueString, porem temos que retornar o ZERO, para continuar correto os valores
        }catch(Exception e){
            //se caior no cacth retorno a proxima letra
            return retornaProximaLetra(value);
        }
    }

    private char retornaProximaLetra(char value) {

        if (value >= 'A' && value < 'Z') {
            return (char) (value + 1);
        } else if (value == 'Z') {
            return 'A';
        } else if (value >= 'a' && value < 'z') {
            return (char) (value + 1);
        } else if (value == 'z') {
            return 'a';
        }
        return value;
    }

    public EsquadriaObra duplicarEsquadriaObra(EsquadriaObra esquadriaObra)throws Exception{
        validaInsert(esquadriaObra);

        esquadriaObra.setCdEsquadriaObra(retornaProximoCodigoEsquadria(esquadriaObra.getCdEsquadriaObra()));

        Obra obra = obraService.findById(esquadriaObra.getObra().getIdObra());
        if(!obra.isStImpresso()){
            esquadriaObra.setIdEsquadriaObra(null);//sera para null para criar uma nova esquadriaObra
            esquadriaObra.setNrVersaobra(obra.getNrVersao());
            return esquadriaObraRepository.saveAndFlush(esquadriaObra);
        }else{
            esquadriaObra.setIdEsquadriaObra(null);
            return insereEsquadriaEmObraImpressa(esquadriaObra);
        }
    }

    public List<EsquadriaObraAgrupadaDto> findAllAgrupado (Long idObra){
        List<Object[]> objs = esquadriaObraRepository.findAllAgrupado(idObra);
        List<EsquadriaObraAgrupadaDto> listaDto = new ArrayList<>();

        for (Object[] obj: objs) {
            EsquadriaObraAgrupadaDto dto = new EsquadriaObraAgrupadaDto();

            dto.setIdObra(((BigInteger) obj[0]).longValue());
            dto.setIdEsquadria(((BigInteger) obj[1]).longValue());
            dto.setDsCor((String) obj[2]);
            dto.setTmLargura((BigDecimal) obj[3]);
            dto.setTmAltura((BigDecimal) obj[4]);
            dto.setQtde(((BigInteger) obj[5]).longValue());
            dto.setCdEsquadriaObra((String) obj[6]);
            dto.setDsEsquadria((String) obj[7]);

            listaDto.add(dto);
        }
        return listaDto;
    }
}
